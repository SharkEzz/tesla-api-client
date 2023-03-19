import GetVehicleResponseSchema from '../schemas/GetVehicleResponseSchema.js';
import transport from '../transport.js';

/**
 * Wake up the vehicle.
 * @returns The vehicle's response to the wake up command.
 */
const wakeUp = (vehicleId: string, token: string) =>
  transport.post(`/api/1/vehicles/${vehicleId}/wake_up`, token, GetVehicleResponseSchema);

export default wakeUp;
