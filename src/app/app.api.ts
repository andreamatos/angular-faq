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
    ACD_FAQ: 'https://gatewaydev.cruzeirodosul.edu.br:31090/zuul/acd-faq',
    endpointRedis: 'https://gatewaydev.cruzeirodosul.edu.br:31090/zuul/cse-redis',
    endpointRefreshToken: 'https://gatewaydev.cruzeirodosul.edu.br:31090/zuul/cse-oauth/token/refreshToken/',
};
