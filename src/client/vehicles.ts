import GetVehiclesResponseSchema from '../schemas/GetVehiclesResponseSchema.js';
import transport from '../transport.js';

/**
 * Get all vehicles associated with the account.
 * @returns The status of the vehicles associated with the account.
 */
const vehicles = (token: string) => transport.get('/api/1/vehicles', GetVehiclesResponseSchema, token);

export default vehicles;
