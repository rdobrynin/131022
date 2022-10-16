import { Injectable, Logger } from '@nestjs/common';
import { RateLimitService } from '../../../shared/services/rateLimit.service';
import { RateLimitTypeEnum } from '../../../shared/constants/rate-limit-type.enum';
import { AuthPayloadDto } from '../../../shared/dtos/auth-payload.dto';

@Injectable()
export class PublicService {
  constructor(
    private readonly logger: Logger,
    private rateLimitService: RateLimitService,
  ) {}

  async get(ipAddress: string): Promise<void> {
    const cacheItem = await this.rateLimitService.getByIpAddress(
      ipAddress,
      RateLimitTypeEnum.IP,
    );
    if (!cacheItem) {
      await this.rateLimitService.throttle(ipAddress, RateLimitTypeEnum.IP);
    } else {
      const authDto: AuthPayloadDto = JSON.parse(cacheItem);
      await this.rateLimitService.throttle(
        ipAddress,
        RateLimitTypeEnum.IP,
        authDto,
      );
    }
  }
}
