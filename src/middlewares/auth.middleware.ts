import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiConfigService } from '../shared/services/api-config.service';
import { RateLimitService } from '../shared/services/rateLimit.service';
import { AuthPayloadDto } from '../shared/dtos/auth-payload.dto';
import { RateLimitTypeEnum } from '../shared/constants/rate-limit-type.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly apiConfigService: ApiConfigService,
    private rateLimitService: RateLimitService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request private ep && check token for throttling...');
    if (req.get('x-api-token') !== this.apiConfigService.apiToken) {
      throw new ForbiddenException();
    }

    const ipAddress = req.ip;

    const cacheItem = await this.rateLimitService.getByIpAddress(
      ipAddress,
      RateLimitTypeEnum.TOKEN,
    );
    console.log(cacheItem);

    if (!cacheItem) {
      await this.rateLimitService.throttle(ipAddress, RateLimitTypeEnum.TOKEN);
    } else {
      const authDto: AuthPayloadDto = JSON.parse(cacheItem);
      await this.rateLimitService.throttle(
        ipAddress,
        RateLimitTypeEnum.TOKEN,
        authDto,
      );
    }

    next();
  }
}
