import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoOptions from './config/mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        closeClient: true,
        config: configService.redisConfig,
      }),
      inject: [ApiConfigService],
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        name: process.env.REDIS_NAME,
        db: parseInt(process.env.REDIS_DB),
      },
    }),
    MongooseModule.forRoot(mongoOptions.uri),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
