import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PublicService {
  constructor(private readonly logger: Logger) {}

  async get(ip: string): Promise<void> {
    console.log(ip);
    return Promise.resolve();
  }
}
