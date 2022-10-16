import { Logger, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PublicController } from './controllers/public.controller';
import { PublicService } from './services/public.service';

@Module({
  imports: [SharedModule],
  controllers: [PublicController],
  providers: [PublicService, Logger],
})
export class PublicModule {}
