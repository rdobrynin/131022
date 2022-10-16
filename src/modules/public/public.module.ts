import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PublicController } from './controllers/public.controller';
import { PublicService } from './services/public.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel } from '../auth/schemas/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([AuthModel]), SharedModule],
  controllers: [PublicController],
  providers: [PublicService, Logger],
})
export class PublicModule {}
