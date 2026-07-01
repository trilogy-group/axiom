import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('/status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Post('/workflows/:id/execute')
  executeWorkflow(@Param('id') id: string, @Body() body: any) {
    return {
      message: 'Workflow execution started',
      workflowId: id,
      timestamp: new Date().toISOString(),
    };
  }
}
