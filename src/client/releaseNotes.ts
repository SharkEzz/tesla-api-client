import ReleaseNotesResponseSchema from '../schemas/ReleaseNotesResponseSchema.js';
import transport from '../transport.js';

/**
 * @returns The charge state of the vehicle.
 */
const releaseNotes = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/release_notes`, ReleaseNotesResponseSchema, token);

export default releaseNotes;
