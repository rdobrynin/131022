import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../../auth/schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async get(): Promise<void> {
    // whatever else
    // await this.authModel.db.get('whatever');
  }
}
