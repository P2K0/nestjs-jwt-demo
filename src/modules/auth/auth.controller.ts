import type { UserInfoModel } from '@/modules/user/interface/user.interface';

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { IsPublic } from '@/decorators/index.decorator';
import { useHttpException } from '@/hook/index.hook';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '刷新token' })
  @ApiQuery({ name: 'token' })
  @IsPublic()
  @Get('/refresh')
  refreshToken(@Query('token') token: string): UserInfoModel {
    try {
      const { username } = this.authService.verifyToken(token);
      const user = this.authService.findUserForUserName(username);
      const refreshToken = this.authService.createToken(user);

      return {
        userInfo: { username: user.username },
        token: refreshToken
      };
    } catch {
      useHttpException('AUTH_TOKEN_ERROR');
    }
  }

  @ApiOperation({ summary: '校验token是否正确' })
  @ApiQuery({ name: 'token' })
  @IsPublic()
  @Get('/verify')
  verifyToken(@Query('token') token: string): boolean {
    try {
      this.authService.verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
