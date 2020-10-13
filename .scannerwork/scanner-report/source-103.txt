// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const SERVER_BASE_URL = 'http://localhost:8080/v1';

export const HTTP_TIMEOUT = 30000;
export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_BACKOFF = 500;
export const HTTP_CALL_DELAY = 0;

export const PUBLIC_ACCESS_URL = [
    /assets\//,
    /login\//,
    /logout\//,
    /erro\//,
];

export const environment = {
    production: false,
    local: false,
    ACD_FAQ: 'http://localhost:8081',
    endpointRedis: 'https://gatewaydev.cruzeirodosul.edu.br:31090/zuul/cse-redis',
    endpointRefreshToken: 'https://gatewaydev.cruzeirodosul.edu.br:31090/zuul/cse-oauth/token/refreshToken/',
};