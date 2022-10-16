import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AbstractConfigService {
  constructor(protected configService: ConfigService) {}

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
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

  protected getBoolean(key: string): boolean {
    return this.configService.get(key) === 'true';
  }

  protected getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (value === null || value === undefined) {
      throw new Error(`${key} environment variable doesn't exist`);
    }

    return value.replace(/\\n/g, '\n');
  }

  protected getNumber(key: string): number {
    return Number(this.getString(key));
  }
}
