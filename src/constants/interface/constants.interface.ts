export interface ErrorMessage {
  DEFAULT_ERROR: string;
  AUTH_ERROR: string;
  AUTH_TOKEN_ERROR: string;
}

export type ErrorMessageKeys = keyof ErrorMessage;

export interface SuccessMessage {
  DEFAULT_SUCCESS: string;
}

export type SuccessMessageKeys = keyof SuccessMessage;
