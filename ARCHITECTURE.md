# ShelfShare: System Architecture & Data Flow

This document provides a visual overview of the ShelfShare project architecture and core data flows using UML diagrams.

These diagrams are written in the Mermaid syntax, which GitHub automatically renders into a visual diagram when you view this file on the website.

---

## 1. System Architecture Diagram

This diagram shows the high-level components of the application. It illustrates the containerized services (Client, Server, Redis) running within a Docker network, and their communication with the external MongoDB Atlas database and the user's browser.

[Image of a 3-tier web application architecture diagram]
```mermaid
graph TD
    subgraph User
        U(User's Browser)
    end

    subgraph " "
        %% This title is now in quotes to fix the parse error
        subgraph "App Services (Docker / Render)"
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
