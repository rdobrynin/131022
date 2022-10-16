import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RealIP } from 'nestjs-real-ip';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  createPrivate(@RealIP() ip: string) {
    console.log('response from private');
    return this.service.create(ip);
  }
}
