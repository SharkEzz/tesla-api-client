import ChargeStateResponseSchema from '../schemas/ChargeStateResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The charge state of the vehicle.
 */
const charge = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/charge_state`, ChargeStateResponseSchema, token);

export default charge;
