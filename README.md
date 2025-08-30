# GraphQL API Challenge

A simple GraphQL API server built with **Apollo Server**, **TypeScript**, and **Node.js**.

## ✨ Features

- GraphQL API with `getUser` and `listUsers` queries
- TypeScript implementation
- Automated test suite with Jest
- Docker containerization (production, development with hot reload, and test profile)
- Configurable CORS and Sandbox via environment variables
- In-memory data storage (no external DB required)

---

## ⚙️ Installation

```bash
npm install
```

---

## ▶️ Usage

### Run Tests (local)
```bash
npm test
```

### Start Server (local, compiled)
```bash
npm run build
npm start
```

### Development Mode (hot reload with ts-node)
```bash
npm run dev
```

---

## 🐳 Docker

This project includes a ready-to-use **docker-compose.yml** with multiple profiles.

### Run in Production
```bash
docker-compose up graphql-api
```
➡️ Builds the image and runs the API in production mode (`node dist/server.js`).

### Run in Development (with hot reload)
```bash
docker-compose --profile dev up graphql-dev
```
➡️ Mounts your local source code into the container and runs with `ts-node --watch`.

### Run Tests in Docker
```bash
docker-compose --profile test up --abort-on-container-exit --exit-code-from tests
```
➡️ Spins up a test container and executes Jest inside Docker.

### Build and Run Manually
```bash
docker build -t graphql-challenge .
docker run -p 4000:4000 graphql-challenge
```

---

## 🎮 GraphQL Playground

Once running, visit:

- `http://localhost:4000` (local / Docker)  
- or the Codespaces/Render public URL if deployed

### 🔍 Sample Queries

```graphql
# Get user by ID
query {
  getUser(id: "1") {
    id
    name
    email
    age
  }
}

# List users with limit
query {
  listUsers(limit: 2) {
    id
    name
    email
  }
}
```

---

## 📂 Project Structure

```
src/
├── schema.ts        # GraphQL schema and resolvers
├── server.ts        # Apollo Server setup
tests/
└── schema.test.ts   # Test suite
```

---

## 🌍 Live Demo (GitHub Codespaces)

This project can also be run directly in GitHub Codespaces.  

- **Temporary endpoint (only works while Codespace is active):**  
  👉 https://<your-codespace-id>-4000.app.github.dev/  

⚠️ **Note:** This link is ephemeral — it will stop working if the Codespace is paused.  
To evaluate locally, please use the Docker or npm instructions above.

---

## 🔧 Environment Variables

All configuration is driven by `.env` (see `.env.example`):

- `PORT` → Server port (default: `4000`)  
- `NODE_ENV` → Environment mode (`development`, `production`)  
- `ENABLE_SANDBOX` → `true` to enable Apollo Sandbox landing page (default: `false`)  
- `CORS_ORIGIN` → Comma-separated list of allowed origins (default: `https://studio.apollographql.com,*.github.dev`)  
