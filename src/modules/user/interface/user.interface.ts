import type { AuthModel } from '@/modules/auth/interface/auth.interface';

export interface UserModel {
  id: string | number;
  username: string;
  password: string | number;
}

export interface UserInfoModel {
  userInfo: {
    username: string;
  };
  token: AuthModel;
}

export type UserListModel = Omit<UserModel, 'password'>[];
