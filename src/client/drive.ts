import DriveStateResponseSchema from '../schemas/DriveStateResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The drive state of the vehicle.
 */
const drive = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/data_request/drive_state`, DriveStateResponseSchema, token);

export default drive;
