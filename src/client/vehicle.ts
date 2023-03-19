import GetVehicleResponseSchema from '../schemas/GetVehicleResponseSchema.js';
import transport from '../transport.js';

/**
 * Get all vehicles associated with the account.
 * @returns The status of the vehicles associated with the account.
 */
const vehicle = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}`, GetVehicleResponseSchema, token);

export default vehicle;
