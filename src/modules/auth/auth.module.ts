import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { AuthModel } from './schemas/auth.schema';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [MongooseModule.forFeature([AuthModel]), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth');
  }
}
