import { z } from 'zod';

const VehicleConfigResponseSchema = z.object({
  response: z.object({
    can_accept_navigation_requests: z.boolean(),
    can_actuate_trunks: z.boolean(),
    car_special_type: z.string(),
    car_type: z.string(),
    charge_port_type: z.string(),
    ece_restrictions: z.boolean(),
    eu_vehicle: z.boolean(),
    exterior_color: z.string(),
    has_air_suspension: z.boolean(),
    has_ludicrous_mode: z.boolean(),
    motorized_charge_port: z.boolean(),
    plg: z.boolean(),
    rear_seat_heaters: z.number(),
    rear_seat_type: z.number(),
    rhd: z.boolean(),
    roof_color: z.string(),
    seat_type: z.number(),
    spoiler_type: z.string(),
    sun_roof_installed: z.number(),
    third_row_seats: z.string(),
    timestamp: z.number(),
    trim_badging: z.string(),
    use_range_badging: z.boolean(),
    wheel_type: z.string(),
  }),
});

export default VehicleConfigResponseSchema;
