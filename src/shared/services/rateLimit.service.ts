import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';
@Injectable()
export class RateLimitService {
  private readonly redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async set(key: string, authPayloadDto: AuthPayloadDto) {
    const buf = Buffer.from(JSON.stringify(authPayloadDto));
    return this.redis.set(key, buf);
  }

  async getByIpAddress(ipAddress: string) {
    return this.redis.get(ipAddress);
  }
}
