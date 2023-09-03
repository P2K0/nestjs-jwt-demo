import type { ErrorMessage, ErrorMessageKeys } from './interface/constants.interface';

export const ERROR_MESSAGE: ErrorMessage = {
  DEFAULT_ERROR: '服务器内部处理错误',
  AUTH_ERROR: '账号或者密码错误',
  AUTH_TOKEN_ERROR: '无效的token'
};

export const ERROR_CODE: Record<ErrorMessageKeys, number> = {
  DEFAULT_ERROR: 500,
  AUTH_ERROR: 401,
  AUTH_TOKEN_ERROR: 401
};
