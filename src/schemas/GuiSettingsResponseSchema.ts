import { z } from 'zod';

const GuiSettingsResponseSchema = z.object({
  response: z.object({
    gui_24_hour_time: z.boolean(),
    gui_charge_rate_units: z.string(),
    gui_distance_units: z.string(),
    gui_range_display: z.string(),
    gui_temperature_units: z.string(),
    show_range_units: z.boolean(),
    timestamp: z.number(),
  }),
});

export default GuiSettingsResponseSchema;
