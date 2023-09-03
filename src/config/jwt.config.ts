import type { JwtConfig } from './interface/config.interface';

export const JWT_CONFIG: JwtConfig = {
  SECRET: 'jwt-demo-secret',
  ACCESS_EXPIRES: '0.5h',
  REFRESH_EXPIRES: '7d'
};
