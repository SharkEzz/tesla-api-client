import transport from '../transport.js';

/**
 * Stops charging the vehicle.
 */
const stopCharge = (vehicleId: string, token: string) =>
  transport.post(`/api/1/vehicles/${vehicleId}/command/charge_stop`, token);

export default stopCharge;
