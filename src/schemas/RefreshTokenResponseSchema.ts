import { z } from 'zod';

const RefreshTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
});

export default RefreshTokenResponseSchema;
