import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RedisConfig {
  @IsString()
  @Expose()
  HOST: string;

  @IsNumber()
  @Expose()
  PORT: number;

  TTL?: number;
  static HOST: string;
}
