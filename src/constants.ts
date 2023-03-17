export enum TeslaApiEndpoints {
  REFRESH_TOKEN_URL = 'https://auth.tesla.com/oauth2/v3/token',
  STREAMING_API = 'wss://streaming.vn.teslamotors.com/streaming/',
  OWNER_API_URL = 'https://owner-api.teslamotors.com',
}

export const FETCH_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Teslog/1.0.0',
} as const;
