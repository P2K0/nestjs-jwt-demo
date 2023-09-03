import type { SortType, StringKeyedObject, SuccessResponseModel } from './interface/global.interface';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SUCCESS_CODE, SUCCESS_MESSAGE } from '@/constants/success.constants';

@Injectable()
export class SuccessInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseModel<T>> {
    return next.handle().pipe(
      map((data: T): SuccessResponseModel<T> => {
        return {
          code: SUCCESS_CODE['DEFAULT_SUCCESS'],
          msg: SUCCESS_MESSAGE['DEFAULT_SUCCESS'],
          data: this.sortData(data, 'asc'),
          timestamp: Date.now(),
          path: context.switchToHttp().getRequest().route.path
        };
      })
    );
  }

  private sortData(data: T, sortType: SortType): T {
    if (Array.isArray(data)) {
      return this.sortArray(data, sortType) as T;
    } else if (typeof data === 'object') {
      return this.sortObjectKeys(data, sortType) as T;
    } else {
      return data;
    }
  }

  private sortObjectKeys(obj: StringKeyedObject, sortType: SortType): StringKeyedObject {
    let keys: string[] = Object.keys(obj);
    const sortedObj: StringKeyedObject = {};

    if ('id' in obj) {
      const keysWithId = keys.filter((key) => key === 'id');
      const keysWithoutId = keys.filter((key) => key !== 'id');

      keysWithId.sort((a, b) => {
        const idA = obj[a]?.id || 0;
        const idB = obj[b]?.id || 0;
        return sortType === 'asc' ? idA - idB : idB - idA;
      });

      keys = keysWithId.concat(keysWithoutId);
    } else {
      keys.sort();
    }

    for (const key of keys) {
      sortedObj[key] = this.sortData(obj[key], sortType);
    }

    return sortedObj;
  }

  private sortArray(arr: T[], sortType: SortType): T[] {
    const sortedArray = arr.map((item) => this.sortData(item, sortType));
    return sortType === 'asc' ? sortedArray : sortedArray.reverse();
  }
}
