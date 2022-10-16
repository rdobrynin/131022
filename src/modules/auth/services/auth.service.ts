import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';
import { RateLimitService } from '../../../shared/services/rateLimit.service';
import { RateLimitTypeEnum } from "../../../shared/constants/rate-limit-type.enum";
import { AuthPayloadDto } from "../../../shared/dtos/auth-payload.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private rateLimitService: RateLimitService,
    // @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async create(ipAddress: string): Promise<void> {
    const cacheItem = await this.rateLimitService.getByIpAddress(
      ipAddress,
      RateLimitTypeEnum.TOKEN,
    );
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
  }
}
