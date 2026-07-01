# Axiom - Enterprise Integration Platform

## Overview

Axiom is a next-generation enterprise integration platform designed to streamline data flow, API orchestration, and workflow automation across distributed systems. Built with TypeScript, Node.js, and NestJS, Axiom provides a scalable, type-safe foundation for enterprise integrations.

## Key Features

- **API Gateway**: High-performance request routing and orchestration
- **Core Integration Engine**: Workflow automation and data transformation
- **Type-Safe Architecture**: Full TypeScript implementation across all services
- **Monorepo Structure**: Unified workspace for seamless development and deployment
- **Production Ready**: Enterprise-grade error handling, logging, and monitoring

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/trilogy-group/axiom.git
cd axiom
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
npm run test
```

## Project Structure

```
axiom/
├── apps/
│   ├── gateway/          # API Gateway (Node.js + TypeScript)
│   └── core/             # Core Engine (NestJS)
├── package.json          # Root workspace configuration
├── README.md             # This file
└── CLAUDE.md             # Architecture documentation
```

## Architecture

See [CLAUDE.md](./CLAUDE.md) for detailed architecture documentation, design decisions, and service interaction patterns.

## License

MIT

## Support

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/trilogy-group/axiom).
