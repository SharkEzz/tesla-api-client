import VehicleConfigResponseSchema from '../schemas/VehicleConfigResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The charge state of the vehicle.
 */
const config = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_config`, VehicleConfigResponseSchema, token);

export default config;
