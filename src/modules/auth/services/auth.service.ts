import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async create() {
    return Promise.resolve();
  }
}
