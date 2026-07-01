# Core Integration Engine

NestJS-based core service for Axiom. Handles workflow orchestration, data transformation, and service integration.

## Features

- Workflow orchestration
- Data transformation pipelines
- Service integration
- Event processing
- Modular architecture

## Quick Start

```bash
npm run dev
```

The core service will start on port 3001.

### Health Check

```bash
curl http://localhost:3001/health
```

### Status Endpoint

```bash
curl http://localhost:3001/status
```

### Execute Workflow

```bash
curl -X POST http://localhost:3001/workflows/test-workflow/execute \
  -H "Content-Type: application/json" \
  -d '{"input": {}}'
```

## Architecture

See the root [CLAUDE.md](../../CLAUDE.md) for service architecture and design decisions.
