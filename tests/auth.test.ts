import Authenticator from '../src/auth.js';

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5ZdVZJWTJTN3gxVHRYM01KMC1QMDJad3pBQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92MyIsImF1ZCI6WyJodHRwczovL293bmVyLWFwaS50ZXNsYW1vdG9ycy5jb20vIiwiaHR0cHM6Ly9hdXRoLnRlc2xhLmNvbS9vYXV0aDIvdjMvdXNlcmluZm8iXSwiYXpwIjoib3duZXJhcGkiLCJzdWIiOiIyYTExZDAwZi03Yjk1LTRhNzMtOTg0Ni02Mzk0MWJhYzQyYzAiLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOltdLCJleHAiOjE2NzkxMTEyMDAsImlhdCI6MTY3OTA4MjQwMH0.qqCBXDoAxj9BS5lF2UubBXwgsRR9UBIt6XgX20f_Nhg';
const FAKE_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5ZdVZJWTJTN3gxVHRYM01KMC1QMDJad3pBQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92MyIsImF1ZCI6Imh0dHBzOi8vYXV0aC50ZXNsYS5jb20vb2F1dGgyL3YzL3Rva2VuIiwiaWF0IjoxNjc2NzMyNDA0LCJzY3AiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiZGF0YSI6eyJ2IjoiMSIsImF1ZCI6Imh0dHBzOi8vb3duZXItYXBpLnRlc2xhbW90b3JzLmNvbS8iLCJzdWIiOiIyYTExZDAwZi03Yjk1LTRhNzMtOTg0Ni02Mzk0MWJhYzQyYzAiLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhenAiOiJvd25lcmFwaSIsImFtciI6WyJwd2QiLCJtZmEiLCJvdHAiXSwiYXV0aF90aW1lIjoxNjc2NzMyNDA0fX0.2SaS0oUl2enja2VgWcstwWgp6iqHvXlEZ_CSxGCXl5k';
const TOKEN_EXPIRATION = 1679111200000;

describe('auth', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({
            access_token: '',
            refresh_token: '',
            expires_in: 0,
          });
        },
      });
    });
  });

  it('should be able to authenticate with valid credentials and if the token is not expired', async () => {
    global.Date.now = jest.fn().mockReturnValue(1679101200000);

    const auth = new Authenticator(FAKE_TOKEN, FAKE_REFRESH_TOKEN);
    expect(fetch).not.toHaveBeenCalled();
    const result = await auth.getAccessToken();
    expect(Date.now).toHaveBeenCalled();
    expect(result).toBe(FAKE_TOKEN);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should be able to authenticate with valid credentials if the token is expired', async () => {
    global.Date.now = jest.fn().mockReturnValue(TOKEN_EXPIRATION);

    const auth = new Authenticator(FAKE_TOKEN, FAKE_REFRESH_TOKEN);
    expect(fetch).not.toHaveBeenCalled();
    const result = await auth.getAccessToken();
    expect(Date.now).toHaveBeenCalled();
    expect(result).toBe('');
    expect(fetch).toHaveBeenCalled();
  });

  it('should return an error if refresh token response is not ok', async () => {
    global.Date.now = jest.fn().mockReturnValue(TOKEN_EXPIRATION);
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => {
          return Promise.resolve({
            access_token: '',
            refresh_token: '',
            expires_in: 0,
          });
        },
      });
    });

    const auth = new Authenticator(FAKE_TOKEN, FAKE_REFRESH_TOKEN);
    expect(fetch).not.toHaveBeenCalled();
    const result = (await auth.getAccessToken()) as Error;
    expect(Date.now).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Failed to refresh access token');
  });

  it('should return an error if refresh token response does not match the schema', async () => {
    global.Date.now = jest.fn().mockReturnValue(TOKEN_EXPIRATION);
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({
            refresh_token: '',
            expires_in: 0,
          });
        },
      });
    });

    const auth = new Authenticator(FAKE_TOKEN, FAKE_REFRESH_TOKEN);
    expect(fetch).not.toHaveBeenCalled();
    const result = (await auth.getAccessToken()) as Error;
    expect(Date.now).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Failed to parse refresh token response');
  });
});
