# Axiom Architecture Documentation

## Overview

Axiom is a monorepo-based enterprise integration platform consisting of two core services: an API Gateway and a Core Integration Engine. This document outlines the architecture, design decisions, and service interaction patterns.

## System Architecture

### High-Level Components

```
┌─────────────────────────────────────────────────────────┐
│                    Client Applications                  │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────┐
│              API Gateway (apps/gateway)                 │
│  - Request routing and orchestration                    │
│  - Authentication & authorization                      │
│  - Rate limiting and throttling                         │
│  - Request/response transformation                      │
└──────────────────────────┬──────────────────────────────┘
                           │ gRPC/Internal API
                           ▼
┌─────────────────────────────────────────────────────────┐
│          Core Engine (apps/core - NestJS)               │
│  - Workflow orchestration                               │
│  - Data transformation pipelines                        │
│  - Service integration logic                            │
│  - Event processing                                     │
└─────────────────────────────────────────────────────────┘
```

## Services

### 1. API Gateway (`apps/gateway`)

**Technology Stack:**
- Node.js + Express (or Fastify)
- TypeScript
- Lightweight, high-performance request routing

**Responsibilities:**
- Routes incoming requests to appropriate services
- Handles protocol translation (HTTP ↔ internal APIs)
- Implements cross-cutting concerns (logging, metrics, security)
- Rate limiting and request throttling
- Request/response validation

**Key Files:**
- `src/index.ts` - Server entry point
- `src/routes/` - Endpoint definitions
- `src/middleware/` - Custom middleware

### 2. Core Integration Engine (`apps/core`)

**Technology Stack:**
- NestJS framework
- TypeScript
- Modular architecture

**Responsibilities:**
- Orchestrates complex workflows
- Manages data transformation pipelines
- Coordinates service-to-service communication
- Event-driven architecture
- Business logic execution

**Key Files:**
- `src/main.ts` - Application bootstrap
- `src/modules/` - Feature modules
- `src/services/` - Business logic

## Design Decisions

### Monorepo Structure

**Decision:** Use npm workspaces in a monorepo layout.

**Rationale:**
- Shared code and types across services
- Simplified dependency management
- Unified CI/CD pipeline
- Atomic commits for related changes

### Technology Choices

**TypeScript Everywhere:**
- Type safety across the entire platform
- Better IDE support and developer experience
- Reduced runtime errors

**NestJS for Core:**
- Built-in dependency injection
- Decorator-based architecture
- Rich ecosystem of modules
- Excellent documentation

**Lightweight Gateway:**
- Minimal dependencies
- Fast request processing
- Simple to reason about and extend

## Development Workflow

### Local Setup

```bash
# Clone and install
git clone https://github.com/trilogy-group/axiom.git
cd axiom
npm install

# Start development servers
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### Workspace Commands

All commands execute across workspace packages:

```bash
npm run dev --workspaces      # Start all services in dev mode
npm run build --workspaces    # Build all packages
npm run test --workspaces     # Run all test suites
```

## API Contract

### Gateway → Core Communication

Services communicate via RESTful APIs (or gRPC for high-performance scenarios).

**Example Request:**
```
POST /core/workflows/{id}/execute
Content-Type: application/json

{
  "input": { ... },
  "context": { ... }
}
```

## Deployment Strategy

### Local Development
- All services run on localhost
- Hot reloading enabled
- Shared package dependencies via workspaces

### Production
- Container-based deployments (Docker)
- Separate service scaling
- Kubernetes-ready architecture

## Monitoring & Observability

### Logging
- Structured JSON logging
- Centralized log aggregation-ready

### Metrics
- Request latency tracking
- Service health checks
- Custom business metrics

### Tracing
- Distributed tracing support ready
- Request correlation IDs

## Future Enhancements

- [ ] Add message queue integration (RabbitMQ/Kafka)
- [ ] Implement gRPC communication between services
- [ ] Add comprehensive metrics dashboard
- [ ] Database abstraction layer
- [ ] Authentication service
- [ ] Plugin system for extensibility

## Contributing

When adding new features:

1. Keep services loosely coupled
2. Maintain type safety across boundaries
3. Add comprehensive tests
4. Update this documentation
5. Follow the established code patterns

## References

- [NestJS Documentation](https://docs.nestjs.com)
- [Express.js Guide](https://expressjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
