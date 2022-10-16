import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiConfigService } from '../shared/services/api-config.service';
import { RateLimitService } from '../shared/services/rateLimit.service';
import { AuthPayloadDto } from '../shared/dtos/auth-payload.dto';
import { plainToClass } from 'class-transformer';
import { RateLimitTypeEnum } from '../shared/constants/rate-limit-type.enum';
import { ThrottlerException } from '../shared/exceptions/throttler.exception';

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
    // rate-limit
    const cacheItem = await this.rateLimitService.getByIpAddress(ipAddress);

    if (!cacheItem) {
      await this.sendData(ipAddress, 1);
    } else {
      // if key is exists check count of requests and compare time
      const authDto: AuthPayloadDto = JSON.parse(cacheItem);

      console.log(authDto);

      if (authDto.type === RateLimitTypeEnum.TOKEN) {
        const oneHourOffset = 60 * 60 * 1000;

        if (Date.now() - authDto.initialTime <= oneHourOffset) {
          if (authDto.count > this.apiConfigService.rateLimit.token) {
            throw new ThrottlerException();
          }
          await this.sendData(ipAddress, authDto.count + 1);
        } else {
          await this.sendData(ipAddress, 1);
        }
      }
    }

    next();
  }

  private async sendData(ipAddress: string, count: number): Promise<void> {
    const authPayloadDto = plainToClass(AuthPayloadDto, {
      ipAddress: ipAddress,
      type: RateLimitTypeEnum.TOKEN,
      count: count,
      initialTime: Date.now(),
    });

    await this.rateLimitService.set(ipAddress, authPayloadDto);
  }
}
