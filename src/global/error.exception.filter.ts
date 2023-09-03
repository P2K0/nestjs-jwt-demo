import type { ErrorResponseModel } from '@/global/interface/global.interface';
import type { ArgumentsHost } from '@nestjs/common';
import type { ExceptionFilter } from '@nestjs/common/interfaces';

import { Catch, HttpException } from '@nestjs/common';

import { ERROR_CODE, ERROR_MESSAGE } from '@/constants/error.constants';

@Catch(HttpException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): ErrorResponseModel {
    const ctx = host.switchToHttp();

    return ctx.getResponse().json({
      code: exception.getStatus() || ERROR_MESSAGE['DEFAULT_ERROR'],
      msg: exception.message || ERROR_CODE['DEFAULT_ERROR'],
      data: null,
      timestamp: +new Date(),
      path: ctx.getRequest().route?.path || ctx.getRequest().url
    });
  }
}
