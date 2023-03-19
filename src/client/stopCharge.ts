import transport from '../transport.js';

/**
 * Starts charging the vehicle.
 */
const startCharge = (vehicleId: string, token: string) =>
  transport.post(`/api/1/vehicles/${vehicleId}/command/charge_start`, token);

export default startCharge;
