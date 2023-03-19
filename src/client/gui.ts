import GuiSettingsResponseSchema from '../schemas/GuiSettingsResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The GUI settings of the vehicle.
 */
const gui = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/gui_settings`, GuiSettingsResponseSchema, token);

export default gui;
