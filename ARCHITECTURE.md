ShelfShare: System Architecture & Data Flow

This document provides a visual overview of the ShelfShare project architecture and core data flows using UML diagrams.

These diagrams are written in the Mermaid syntax, which GitHub automatically renders into a visual diagram when you view this file on the website.

1. System Architecture Diagram

This diagram shows the high-level components of the application. It illustrates the containerized services (Client, Server, Redis) running within a Docker network, and their communication with the external MongoDB Atlas database and the user's browser.

graph TD
subgraph User
U(User's Browser)
end

    subgraph " "
        subgraph Docker Network
            C[Client (Next.js)]
            S[Server (Express API)]
            R[Redis (Cache + Pub/Sub)]
        end

        subgraph External Services
            DB[(MongoDB Atlas)]
        end
    end

    U -- HTTPs --> C
    C -- API Calls (HTTP) --> S
    S -- Mongoose --> DB
    S -- Read/Write/Pub/Sub --> R

2. Referral System Data Flow (Sequence Diagram)

This diagram details the complex, transactional logic for the core referral feature. It shows the precise sequence of events for a new user registration (Ryan) using an existing user's code (Lina) and what happens on their first purchase.

sequenceDiagram
actor New User (Ryan)
participant Client (Browser)
participant Server (API)
participant MongoDB
participant Redis

    %% --- Registration Flow ---
    New User (Ryan)->>Client (Browser): Clicks referral link from Lina
    Client (Browser)->>Server (API): POST /api/auth/register (with Lina's referralCode)

    rect rgb(230, 255, 230)
        note over Server (API), MongoDB: Start MongoDB Transaction
        Server (API)->>MongoDB: 1. Find Referrer (Lina) by referralCode
        Server (API)->>MongoDB: 2. Create new User (Ryan)
        Server (API)->>MongoDB: 3. Create Referral doc (referrer: Lina, referred: Ryan, status: pending)
        Server (API)->>MongoDB: 4. Update Lina: referredUsersCount + 1
        note over Server (API), MongoDB: Commit Transaction
    end

    Server (API)->>Client (Browser): 201 Created (User Ryan, JWT)
    New User (Ryan)->>Client (Browser): Logs in as Ryan

    %% --- First Purchase Flow ---
    New User (Ryan)->>Client (Browser): Clicks "Buy Product"
    Client (Browser)->>Server (API): POST /api/purchase (with Ryan's JWT)

    rect rgb(230, 255, 230)
        note over Server (API), MongoDB: Start MongoDB Transaction
        Server (API)->>MongoDB: 1. Find 'pending' Referral for Ryan
        Server (API)->>MongoDB: 2. Update Ryan: totalCredits + 2
        Server (API)->>MongoDB: 3. Update Lina: totalCredits + 2, convertedUsersCount + 1
        Server (API)->>MongoDB: 4. Update Referral doc: status = 'converted'
        Server (API)->>MongoDB: 5. Add Product to Ryan's purchasedProducts
        note over Server (API), MongoDB: Commit Transaction
    end

    note over Server (API), Redis: Post-Transaction Logic
    Server (API)->>Redis: 6. DEL user:ryan_id:purchases (Cache Invalidation)
    Server (API)->>Redis: 7. PUBLISH dashboard-updates:lina_id (new stats)
    Server (API)->>Redis: 8. PUBLISH dashboard-updates:ryan_id (new stats)

    Server (API)->>Client (Browser): 200 OK (Purchase Successful)
