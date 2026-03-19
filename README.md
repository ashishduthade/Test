# Test App

Full-stack application with a Spring Boot backend and Next.js frontend.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+ or the `docker-compose` CLI)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/ashishduthade/Test.git
cd Test

# Build and start both services
docker-compose up --build
```

The first build will take a few minutes while Maven and npm download dependencies.

## Access

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Backend  | http://localhost:8080    |

## Stop

```bash
docker-compose down
```

To remove volumes as well:

```bash
docker-compose down -v
```

## Environment Variables

| Variable              | Default                  | Description                        |
|-----------------------|--------------------------|------------------------------------|
| `NEXT_PUBLIC_API_URL` | `http://backend:8080`    | Backend API base URL for frontend  |

## Development

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```
