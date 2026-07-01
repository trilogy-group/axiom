import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'gateway' });
});

// Routes
app.get('/api/v1/status', (req: Request, res: Response) => {
  res.json({
    service: 'axiom-gateway',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

// Placeholder for core service proxy
app.post('/api/v1/workflows/:id/execute', (req: Request, res: Response) => {
  res.json({
    message: 'Workflow execution routed to core service',
    workflowId: req.params.id,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Axiom Gateway running on port ${PORT}`);
});
