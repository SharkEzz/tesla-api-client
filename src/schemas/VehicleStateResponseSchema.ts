import { z } from 'zod';

const VehicleStateResponseSchema = z.object({
  response: z.object({
    api_version: z.number(),
    autopark_state_v2: z.string(),
    autopark_style: z.string(),
    calendar_supported: z.boolean(),
    car_version: z.string(),
    center_display_state: z.number(),
    df: z.number(),
    dr: z.number(),
    ft: z.number(),
    homelink_device_count: z.number(),
    homelink_nearby: z.boolean(),
    is_user_present: z.boolean(),
    last_autopark_error: z.string(),
    locked: z.boolean(),
    media_state: z.object({ remote_control_enabled: z.boolean() }),
    notifications_supported: z.boolean(),
    odometer: z.number(),
    parsed_calendar_supported: z.boolean(),
    pf: z.number(),
    pr: z.number(),
    remote_start: z.boolean(),
    remote_start_enabled: z.boolean(),
    remote_start_supported: z.boolean(),
    rt: z.number(),
    sentry_mode: z.boolean(),
    sentry_mode_available: z.boolean(),
    smart_summon_available: z.boolean(),
    software_update: z.object({
      download_perc: z.number(),
      expected_duration_sec: z.number(),
      install_perc: z.number(),
      status: z.string(),
      version: z.string(),
    }),
    speed_limit_mode: z.object({
      active: z.boolean(),
      current_limit_mph: z.number(),
      max_limit_mph: z.number(),
      min_limit_mph: z.number(),
      pin_code_set: z.boolean(),
    }),
    summon_standby_mode_enabled: z.boolean(),
    sun_roof_percent_open: z.number(),
    sun_roof_state: z.string(),
    timestamp: z.number(),
    tpms_pressure_fl: z.number(),
    tpms_pressure_fr: z.number(),
    tpms_pressure_rl: z.number(),
    tpms_pressure_rr: z.number(),
    valet_mode: z.boolean(),
    valet_pin_needed: z.boolean(),
    vehicle_name: z.string(),
  }),
});

export default VehicleStateResponseSchema;