import { Controller, Get, Post } from '@nestjs/common';
import { PublicService } from '../services/public.service';
import { RealIP } from 'nestjs-real-ip';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get()
  getOne(@RealIP() ip: string) {
    return this.service.get(ip);
  }
}
