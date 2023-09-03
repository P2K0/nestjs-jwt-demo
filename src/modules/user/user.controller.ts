import type { UserInfoModel, UserListModel, UserModel } from './interface/user.interface';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { IsPublic } from '@/decorators/index.decorator';
import { useHttpException } from '@/hook/index.hook';
import { AuthService } from '@/modules/auth/auth.service';
import { UserDto } from '@/modules/user/dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: UserDto })
  @IsPublic()
  @Post('/login')
  login(@Body() userModel: UserModel): UserInfoModel {
    try {
      const user = this.userService.login(userModel);
      const token = this.authService.createToken(user);

      return {
        userInfo: { username: user.username },
        token
      };
    } catch {
      useHttpException('AUTH_ERROR');
    }
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiBearerAuth()
  @Get('/list')
  getUserList(): UserListModel {
    return this.userService.getUserList();
  }
}
