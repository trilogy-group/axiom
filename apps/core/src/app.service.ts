import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'healthy',
      service: 'core',
      timestamp: new Date().toISOString(),
    };
  }

  getStatus() {
    return {
      service: 'axiom-core',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
    };
  }
}
