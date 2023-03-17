import jwtDecode from 'jwt-decode';
import { FETCH_HEADERS, TeslaApiEndpoints } from './constants.js';
import RefreshTokenResponseSchema from './schemas/RefreshTokenResponseSchema.js';

export default class Authenticator {
  private tokenExp: number;

  public constructor(private accessToken: string, private refreshToken: string) {
    const payload = jwtDecode.default<Record<string, unknown> & { exp: number }>(accessToken);
    this.tokenExp = payload.exp * 1000;
  }

  public async getAccessToken(): Promise<string | Error> {
    // Refresh the token if the expiration is in less than an hour
    if (this.tokenExp <= Date.now() - 3600 * 1000) {
      const error = await this.refreshAccessToken();
      if (error instanceof Error) return error;
    }

    return this.accessToken;
  }

  private async refreshAccessToken(): Promise<Error | null> {
    const requestBody = {
      grant_type: 'refresh_token',
      client_id: 'ownerapi',
      refresh_token: this.refreshToken,
      scope: 'openid email offline_access',
    };

    const res = await fetch(TeslaApiEndpoints.REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        ...FETCH_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      return new Error('Failed to refresh access token');
    }

    const validatedRes = RefreshTokenResponseSchema.safeParse(await res.json());
    if (!validatedRes.success) {
      return new Error(validatedRes.error.message);
    }

    this.accessToken = validatedRes.data.access_token;
    this.refreshToken = validatedRes.data.refresh_token;
    this.tokenExp = validatedRes.data.expires_in * 1000 + Date.now();

    return null;
  }
}
