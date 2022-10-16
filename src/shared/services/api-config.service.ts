import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from './abstract-config.services';

@Injectable()
export class ApiConfigService extends AbstractConfigService {
  get apiToken(): string {
    return this.getString('API_TOKEN');
  }

  get rateLimit(): {
    token: number;
    ipAddress: number;
  } {
    return {
      token: this.getNumber('RATE_LIMIT_BY_TOKEN_PER_HOUR'),
      ipAddress: this.getNumber('RATE_LIMIT_BY_IP_PER_HOUR'),
    };
  }

  get redisConfig() {
    const isTlsDisabled = this.getBoolean('REDIS_DISABLE_TLS');
    const config = {
      db: this.getNumber('REDIS_DB'),
      host: this.getString('REDIS_HOST'),
      port: this.getNumber('REDIS_PORT'),
    };

    if (isTlsDisabled) {
      return config;
    }

    return { tls: config };
  }
}
