import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { RateLimitService } from './services/rateLimit.service';

const providers = [ApiConfigService, RateLimitService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
