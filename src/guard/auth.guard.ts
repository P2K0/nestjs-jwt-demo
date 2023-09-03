import type { ActivationModel } from './interface/guard.interface';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

import { useHttpException, useReflector } from '@/hook/index.hook';
import { app } from '@/main';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): ActivationModel {
    if (useReflector('IS_PUBLIC', context)) return true;

    const token = context.switchToHttp().getRequest().headers['authorization']?.split(' ')?.pop();
    const authService = app.get(AuthService);

    try {
      authService.verifyToken(token);
      return true;
    } catch {
      useHttpException('AUTH_TOKEN_ERROR');
      return false;
    }
  }
}
