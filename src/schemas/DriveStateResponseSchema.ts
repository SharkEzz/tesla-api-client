import { z } from 'zod';

const DriveStateResponseSchema = z.object({
  response: z.object({
    gps_as_of: z.number(),
    heading: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    native_latitude: z.number(),
    native_location_supported: z.number(),
    native_longitude: z.number(),
    native_type: z.string(),
    power: z.number(),
    shift_state: z.unknown(),
    speed: z.unknown(),
    timestamp: z.number(),
  }),
});

export default DriveStateResponseSchema;
