import type { GuardConfigKey } from '@/config/interface/config.interface';
import type { ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { GUARD_CONFIG } from '@/config/index.config';
import { app } from '@/main';

export function useReflector(key: GuardConfigKey, context: ExecutionContext) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return app.get(Reflector).get<string[]>(GUARD_CONFIG[key], context.getHandler()) || false;
}
