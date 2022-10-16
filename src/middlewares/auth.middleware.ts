import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiConfigService } from '../shared/services/api-config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly apiConfigService: ApiConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request private ep && check x-api-token...');
    if (req.get('x-api-token') !== this.apiConfigService.apiToken) {
      throw new ForbiddenException();
    }
    next();
  }
}
