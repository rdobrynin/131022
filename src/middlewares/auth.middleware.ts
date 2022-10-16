import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request private ep && check token for throttling...');
    if (req.get('x-api-token') !== process.env.API_TOKEN) {
      throw new ForbiddenException();
    }
    // rate-limit

    next();
  }
}
