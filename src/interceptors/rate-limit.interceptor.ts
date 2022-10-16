import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { RateLimitTypeEnum } from '../shared/constants/rate-limit-type.enum';
import { AuthPayloadDto } from '../shared/dtos/auth-payload.dto';
import { RateLimitService } from '../shared/services/rateLimit.service';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  constructor(private rateLimitService: RateLimitService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<undefined>> {
    const request = context.switchToHttp().getRequest();
    const ipAddress = request.connection.remoteAddress;

    const type: RateLimitTypeEnum =
      request.url === '/auth' ? RateLimitTypeEnum.TOKEN : RateLimitTypeEnum.IP;

    const cacheItem = await this.rateLimitService.getByIpAddress(
      ipAddress,
      type,
    );
    if (!cacheItem) {
      await this.rateLimitService.throttle(ipAddress, type);
    } else {
      const authDto: AuthPayloadDto = JSON.parse(cacheItem);
      await this.rateLimitService.throttle(ipAddress, type, authDto);
    }

    return next.handle();
  }
}
