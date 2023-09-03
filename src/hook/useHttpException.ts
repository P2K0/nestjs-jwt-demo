import type { ErrorMessageKeys } from '@/constants/interface/constants.interface';

import { HttpException } from '@nestjs/common';

import { ERROR_CODE, ERROR_MESSAGE } from '@/constants/index.constants';

export function useHttpException(key?: ErrorMessageKeys): void {
  const resultKey: ErrorMessageKeys = key || 'DEFAULT_ERROR';
  throw new HttpException(ERROR_MESSAGE[resultKey], ERROR_CODE[resultKey]);
}
