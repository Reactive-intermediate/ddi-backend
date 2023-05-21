/**
 * @description 環境參數 Key
 */
export enum ENV {
  PORT = 'PORT',
  isProd = 'isProduction',
  jwtPrivateKey = 'jwtPrivateKey',
  jwtPublicKey = 'jwtPublicKey',
}

/**
 * @description Request Header 參數 Key
 */
export enum HEADERS {
  Auth = 'auth_token',
  AccessToken = 'access-token',
}

/**
 * @description 時間 (ms)
 */
export enum TIME_MS {
  oneMinute = 60 * 1000,
  sixMonths = 6 * 30 * 24 * 60 * 60 * 1000,
}

/**
 * @description 時間 (string)
 */
export enum TIME_STRING {
  oneMinute = '1m',
  sixMonths = '182 days',
}
