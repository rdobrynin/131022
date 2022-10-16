import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';
import { RateLimitService } from '../../../shared/services/rateLimit.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private rateLimitService: RateLimitService,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async create(): Promise<void> {
    // whatever else
    // await this.authModel.create();
  }
}
