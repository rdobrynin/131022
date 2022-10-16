import { Controller, Get } from '@nestjs/common';
import { PublicService } from '../services/public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get()
  getOne() {
    return this.service.get();
  }
}
