import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'users/user.module';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AuthService } from './auth.service';
import { BasicStrategy } from './authBasic.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, ApiKeyStrategy, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
