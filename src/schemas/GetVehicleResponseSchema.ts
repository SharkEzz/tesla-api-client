import { z } from 'zod';

const GetVehicleResponseSchema = z.object({
  response: z.object({
    id: z.number(),
    vehicle_id: z.number(),
    vin: z.string(),
    display_name: z.string(),
    option_codes: z.string().nullable(),
    color: z.unknown(),
    tokens: z.array(z.string()),
    state: z.string(),
    in_service: z.boolean(),
    id_s: z.string(),
    calendar_enabled: z.boolean(),
    api_version: z.number(),
    backseat_token: z.unknown(),
    backseat_token_updated_at: z.unknown(),
  }),
});

export default GetVehicleResponseSchema;
