import type { UserListModel, UserModel } from './interface/user.interface';

import { Injectable } from '@nestjs/common';

import { USER_LIST } from '@/config/index.config';

@Injectable()
export class UserService {
  login(UserModel: UserModel): UserModel {
    const { username, password } = UserModel;

    return USER_LIST.find((i) => {
      return i.username === username && i.password === password;
    });
  }

  getUserList(): UserListModel {
    return USER_LIST.map(({ username, id }) => ({ username, id }));
  }
}
