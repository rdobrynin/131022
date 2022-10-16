import { Injectable } from '@nestjs/common';
import { RateLimitTypeEnum } from '../constants/rate-limit-type.enum';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';
import { plainToClass } from 'class-transformer';
import { ThrottlerException } from '../exceptions/throttler.exception';
import { ApiConfigService } from './api-config.service';
@Injectable()
export class RateLimitService {
  private readonly redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    private readonly apiConfigService: ApiConfigService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async set(key: string, authPayloadDto: AuthPayloadDto) {
    const buf = Buffer.from(JSON.stringify(authPayloadDto));
    return this.redis.set(key, buf);
  }

  async getByIpAddress(ipAddress: string, type: RateLimitTypeEnum) {
    const key = `${ipAddress}-${type}`;
    return this.redis.get(key);
  }

  async sendData(
    ipAddress: string,
    count: number,
    type: RateLimitTypeEnum,
  ): Promise<void> {
    const authPayloadDto = plainToClass(AuthPayloadDto, {
      ipAddress: ipAddress,
      type: type,
      count: count,
      initialTime: Date.now(),
    });

    const key = `${ipAddress}-${type}`;

    await this.set(key, authPayloadDto);
  }

  async throttle(
    ipAddress: string,
    type: RateLimitTypeEnum,
    authDto?: AuthPayloadDto,
  ) {
    if (!authDto) {
      await this.sendData(ipAddress, 1, type);
    } else {
      // if key is exists check count of requests and compare time

      const oneHourOffset = 60 * 60 * 1000;

      if (Date.now() - authDto.initialTime <= oneHourOffset) {
        const limit =
          type === RateLimitTypeEnum.TOKEN
            ? this.apiConfigService.rateLimit.token
            : this.apiConfigService.rateLimit.ipAddress;
        if (authDto.count >= limit) {
          const minDiff = new Date(
            authDto.initialTime + oneHourOffset - Date.now(),
          ).getMinutes();
          throw new ThrottlerException(
            `Current limit requests max ${limit}, available make the next request in ${minDiff} minutes`,
          );
        }
        await this.sendData(ipAddress, authDto.count + 1, type);
      } else {
        await this.sendData(ipAddress, 1, type);
      }
    }
  }
}
