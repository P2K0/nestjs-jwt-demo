export interface AppConfig {
  APP_PORT: number;
}

export interface JwtConfig {
  SECRET: string;
  ACCESS_EXPIRES: string | number;
  REFRESH_EXPIRES: string | number;
}

export interface GuardConfig {
  IS_PUBLIC: string;
}

export type GuardConfigKey = keyof GuardConfig;
