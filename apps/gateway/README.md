# API Gateway

High-performance API Gateway service for Axiom. Handles request routing, orchestration, and protocol translation.

## Features

- Request routing and load balancing
- Authentication & authorization
- Rate limiting
- Request/response transformation
- Health checks

## Quick Start

```bash
npm run dev
```

The gateway will start on port 3000.

### Health Check

```bash
curl http://localhost:3000/health
```

### Status Endpoint

```bash
curl http://localhost:3000/api/v1/status
```

## Architecture

See the root [CLAUDE.md](../../CLAUDE.md) for service architecture and design decisions.
