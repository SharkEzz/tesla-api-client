import ClimateStateResponseSchema from '../schemas/ClimateStateResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The climate state of the vehicle.
 */
const climate = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/climate_state`, ClimateStateResponseSchema, token);

export default climate;
