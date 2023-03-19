import VehicleStateResponseSchema from '../schemas/VehicleStateResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The vehicle state.
 */
const state = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_state`, VehicleStateResponseSchema, token);

export default state;
