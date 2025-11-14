-----

# ShelfShare: A Modern Digital Marketplace & Referral Platform

ShelfShare is a full-stack digital marketplace built with a modern tech stack. It features a complete referral system, user authentication, a product library, and a real-time dashboard. The entire application is containerized with Docker for easy and consistent local development and deployment.

-----

## 🚀 Live Demo

You can view the live, deployed project here:

**[https://shelfshare-frontend.onrender.com](https://shelfshare-frontend.onrender.com)**

> **Note on Free Hosting:**
> This project is deployed on Render's free plan. The backend service will **"spin down"** after a period of inactivity.
>
>   * **First Load:** The initial visit to the site may take **30-60 seconds** to load as the backend server "wakes up".
>   * **First API Call (e.g., Register/Login):** If you try to register or log in after the site has been idle, that first request will also be slow.
>
> Please be patient\! Once the server is awake, the app will be fast and responsive.

-----

## 1\. Docker Setup Instructions (Local)

Follow these steps to get the entire application (frontend, backend, and cache) running on your local machine.

### Prerequisites

  * [Docker](https://www.docker.com/products/docker-desktop/)
  * [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Step-by-Step Guide

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/ShelfShare.git
    cd ShelfShare
    ```

2.  **Create Your Environment File**
    Create a `.env` file in the root of the project by copying the provided `.env.example`.

    ```bash
    # .env
    # ---------------------------------
    # Server Configuration
    # ---------------------------------
    # Port your server will run on (and be exposed to on localhost)
    PORT=5001

    # Create a new, strong, random secret for local testing
    JWT_SECRET=your-super-strong-local-jwt-secret-key-12345

    # URL of your client, for the server's CORS policy
    CLIENT_URL=http://localhost:3000

    # ---------------------------------
    # External Database (MongoDB Atlas)
    # ---------------------------------
    # IMPORTANT: Replace this with your real MongoDB Atlas connection string.
    # Make sure it includes your database name (e.g., "shelfshare").
    MONGO_URI=mongodb+srv://<YOUR_USER>:<YOUR_PASSWORD>@<YOUR_CLUSTER>.mongodb.net/shelfshare?retryWrites=true&w=majority

    # ---------------------------------
    # Internal Docker Services
    # ---------------------------------
    # This tells the server how to find the 'redis' container on the Docker network
    REDIS_URL=redis://redis:6379

    # ---------------------------------
    # Public-Facing URLs (for Browser)
    # ---------------------------------
    # This is what your client-side code (in the browser) will use to call your server.
    # The /api prefix is CRITICAL.
    NEXT_PUBLIC_API_URL=http://localhost:5001/api
    ```


3.  **Build and Run the Containers**
    This command will build the `client` and `server` Docker images and start all services defined in your `docker-compose.yml` file.

    ```bash
    docker-compose up --build
    ```

4.  **Seed Your Database**
    Once the containers are running, open a **new terminal** and run this command to populate your MongoDB Atlas database with the 12 sample products.

    ```bash
    docker-compose exec server npm run db:seed
    ```

5.  **You're Ready\!**

      * **Frontend:** Visit `http://localhost:3000`
      * **Backend Health:** Visit `http://localhost:5001/api/healthcheck`

-----

## 2\. Environment Variables

This project uses a single `.env` file in the root to configure all services via `docker-compose.yml`.

| Variable | Service | Description |
| :--- | :--- | :--- |
| `PORT` | `server` | The port the Node.js/Express server will run on. |
| `JWT_SECRET` | `server` | A private secret key used to sign and verify JSON Web Tokens (JWTs). |
| `CLIENT_URL` | `server` | The origin URL of the frontend, used by the server's CORS middleware. |
| `MONGO_URI` | `server` | The full connection string for your MongoDB Atlas database. |
| `REDIS_URL` | `server` | The connection string for the Redis container, used for caching and Pub/Sub. |
| `NEXT_PUBLIC_API_URL` | `client` | The **public-facing URL** for the backend API (including the `/api` prefix). This is passed to Next.js at build-time and runtime. |

-----

## 3\. API Endpoints (Postman Collection)

The entire API is documented in Postman. You can import the collection and all endpoints by clicking the button below.

[Postman API Documentation](https://documenter.getpostman.com/view/39600710/2sB3WvMdvK)

### API Overview

All routes are prefixed with `/api`.

  * **`GET /healthcheck`**: A simple route to confirm the server is running.
  * **Auth (`/auth`)**: `POST /register` and `POST /login`. Handles user creation, authentication, and JWT generation.
  * **Products (`/products`)**: `GET /` and `GET /:id`. Fetches product lists and details.
  * **Purchase (`/purchase`)**: (Authenticated) `POST /`. Handles the product purchase and referral logic.
  * **Library (`/me/purchases`)**: (Authenticated) `GET /`. Fetches all products owned by the user.
  * **Dashboard (`/me/dashboard`)**: (Authenticated)
      * `GET /`: Gets the user's dashboard stats (credits, referrals, etc.).
      * `GET /stream`: Establishes a Server-Sent Event (SSE) connection for real-time updates.

-----

## 4\. Architecture & Business Logic Explained

### Architecture Overview

This project is a containerized monorepo with a decoupled frontend and backend.

  * **Frontend (`client/`):** A **Next.js** application using the App Router. It handles all UI rendering, routing, and client-side state.
      * **State Management:** Uses **Zustand** for global auth state (token, user) and **React Query** for all server state (products, dashboard, etc.), providing caching and request management.
  * **Backend (`server/`):** A **Node.js/Express** server written in TypeScript (compiled to ES Modules). It serves a RESTful API.
  * **Database (`mongo` - via Atlas):** A **MongoDB** database (hosted on Atlas, defined in `.env`) is the primary data store, using **Mongoose** as the ODM.
  * **Cache/PubSub (`redis`):** A **Redis** container serves two purposes:
    1.  **Caching:** Caches expensive database queries (like product lists) to reduce DB load.
    2.  **Pub/Sub:** Powers the real-time dashboard via a publish/subscribe model.
  * **Containerization:** **Docker** and **Docker Compose** create a reproducible environment. Both `client` and `server` use multi-stage `Dockerfile`s to build optimized, secure production images (running as a non-root `nodejs` user).

### Core Business Logic: The Transactional Referral System

The most complex feature is the referral system, designed to be atomic and resilient using **MongoDB Transactions**.

#### Phase 1: Registration (User 'Lina' refers User 'Ryan')

1.  Ryan signs up at `/register?referralCode=LINA-123`.
2.  The server `registerUser` service receives the request.
3.  A **MongoDB transaction** is initiated.
4.  Inside the transaction, the service *atomically*:
    a.  Creates the new user (Ryan) and generates his *own* unique referral code.
    b.  Finds the referrer (Lina) using `referralCode`.
    c.  Creates a new `Referral` document: `{ referrer: lina_id, referred: ryan_id, status: 'pending' }`.
    d.  Increments Lina's `referredUsersCount` on her `User` document.
5.  If any step fails (e.g., invalid code), the entire transaction is rolled back, and Ryan's account is not created.

#### Phase 2: First Purchase (Ryan buys a product)

1.  Ryan (now logged in) makes his **first purchase** via `POST /api/purchase`.
2.  The `purchaseProduct` service checks if it's his first purchase and if a `pending` referral exists for him.
3.  If yes, a **MongoDB transaction** begins:
    a.  Ryan's `User` document is updated: `totalCredits + 2`.
    b.  Lina's `User` document is updated: `totalCredits + 2` and `convertedUsersCount + 1`.
    c.  The `Referral` document status is set to `"converted"`.
    d.  The `Product` ID is added to Ryan's `purchasedProducts` array.
4.  This atomic operation ensures that credits and conversions are only awarded if the purchase is fully successful.

### Real-Time Dashboard (SSE & Redis Pub/Sub)

The dashboard updates in real-time without polling.

1.  **Connection:** The client dashboard opens an `EventSource` (SSE) connection to `/api/me/dashboard/stream`, sending its JWT as a query parameter.
2.  **Subscription:** The server subscribes this specific user to a unique Redis channel: `dashboard-updates:<userId>`.
3.  **Publication:** When the purchase transaction (Phase 2) **completes**, the `purchaseProduct` service fetches the *new* stats for both Ryan and Lina and `redisClient.publish`es JSON payloads to their respective channels (e.g., `dashboard-updates:ryan_id` and `dashboard-updates:lina_id`).
4.  **Delivery:** The Redis subscribers on the server (for both Ryan and Lina, who are actively listening) receive these messages.
5.  **UI Update:** The server writes this message to the client's open SSE connection. The client's `onmessage` handler parses the JSON and uses React Query's `queryClient.setQueryData` to *instantly* update the dashboard state, causing the UI to re-render with the new stats.

### Caching Strategy (Redis)

The server uses a "cache-aside" pattern with Redis to reduce database load.

  * **Read:** `GET /products` and `GET /me/purchases` first check Redis for cached data. If found, it's returned immediately.
  * **Write (Invalidation):** If data is not in the cache, it's fetched from MongoDB, saved to Redis with a 1-hour expiration, and then returned.
  * **Cache Invalidation:** When a user successfully purchases a product, their personal library cache (`user:<userId>:purchases`) is instantly deleted (`redisClient.del`). The next time they visit their library, it's a cache miss, forcing a fresh query to the database, which then repopulates the cache.
