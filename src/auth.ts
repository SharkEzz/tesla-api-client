import jwtDecode from 'jwt-decode';
import { FETCH_HEADERS, TeslaApiEndpoints } from './constants.js';
import RefreshTokenResponseSchema from './schemas/RefreshTokenResponseSchema.js';

interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export default class Authenticator {
  public static async validateAccessToken(accessToken: string, refreshToken: string): Promise<string | Error> {
    const expiration = jwtDecode.default<{ exp: number }>(accessToken).exp * 1000;

    // Refresh the token if the expiration is in less than an hour
    if (Math.abs(Date.now() - expiration) <= 3600 * 1000) {
      const result = await Authenticator.refreshAccessToken(refreshToken);
      if (result instanceof Error) return result;
      return result.access_token;
    }

    return accessToken;
  }

  private static async refreshAccessToken(refreshToken: string): Promise<Error | RefreshTokenResponse> {
    const requestBody = {
      grant_type: 'refresh_token',
      client_id: 'ownerapi',
      refresh_token: refreshToken,
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
      return new Error('Failed to parse refresh token response');
    }

    return validatedRes.data;
  }
}
