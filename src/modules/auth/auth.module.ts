import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONFIG } from '@/config/jwt.config';

@Module({
  imports: [JwtModule.register({ secret: JWT_CONFIG.SECRET })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
