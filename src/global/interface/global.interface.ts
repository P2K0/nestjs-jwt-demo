interface ResponseMap {
  code: number;
  msg: string;
  timestamp: number | Date;
  path: string;
}

export interface SuccessResponseModel<T> extends ResponseMap {
  data: T;
}

export interface ErrorResponseModel extends ResponseMap {
  data: null;
}

export type SortType = 'asc' | 'desc';
