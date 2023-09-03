import type { AuthModel, TokenModel } from './interface/auth.interface';
import type { UserModel } from '@/modules/user/interface/user.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWT_CONFIG, USER_LIST } from '@/config/index.config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(user: UserModel): AuthModel {
    const access_token = this.createAccessToken(user);
    const refresh_token = this.createRefreshToken(user);

    return { access_token, refresh_token };
  }

  verifyToken(token: string): TokenModel {
    return this.jwtService.verify(token);
  }

  findUserForUserName(username: string): UserModel {
    return USER_LIST.find((i) => i.username === username);
  }

  private createAccessToken(user: UserModel): string {
    return this.jwtService.sign(user, { expiresIn: JWT_CONFIG.ACCESS_EXPIRES });
  }

  private createRefreshToken({ username }: UserModel): string {
    return this.jwtService.sign({ username }, { expiresIn: JWT_CONFIG.REFRESH_EXPIRES });
  }
}
