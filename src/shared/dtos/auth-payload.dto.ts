import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { RateLimitTypeEnum } from '../constants/rate-limit-type.enum';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsNumber()
  @IsPositive()
  count: number;

  @IsEnum(RateLimitTypeEnum)
  type: RateLimitTypeEnum;

  @IsNumber()
  @IsPositive()
  initialTime: number;
}
