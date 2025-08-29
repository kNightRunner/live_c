# GraphQL API Challenge

A simple GraphQL API server built with Apollo Server, TypeScript, and Node.js.

## Features

- GraphQL API with `getUser` and `listUsers` queries
- TypeScript implementation
- Automated test suite with Jest
- Docker containerization
- In-memory data storage

## Installation

```bash
npm install
```

## Usage

### Run Tests
```bash
npm test
```

### Start Server (Local)
```bash
npm start
```

### Development Mode (with watch)
```bash
npm run dev
```

### Docker

#### Production
```bash
docker-compose up graphql-api
```

#### Development (with hot reload)
```bash
docker-compose --profile dev up graphql-dev
```

#### Build and Run Manually
```bash
docker build -t graphql-challenge .
docker run -p 4000:4000 graphql-challenge
```

## GraphQL Playground

Once running, visit `http://localhost:4000` to access GraphQL Playground.

### Sample Queries

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

## Project Structure

```
src/
├── schema.ts      # GraphQL schema and resolvers
├── server.ts      # Apollo Server setup
└── schema.test.ts # Test suite
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment mode# live_c
