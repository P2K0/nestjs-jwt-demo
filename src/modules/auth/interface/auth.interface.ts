import type { UserModel } from '@/modules/user/interface/user.interface';

export interface AuthModel {
  access_token: string;
  refresh_token: string;
}

export interface TimeoutModel {
  exp: number | Date;
  iat: number | Date;
}

export type TokenModel = UserModel & TimeoutModel;
