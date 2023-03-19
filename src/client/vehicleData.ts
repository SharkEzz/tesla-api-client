import VehicleDataResponseSchema from '../schemas/VehicleDataResponseSchema.js';
import transport from '../transport.js';

const vehicleData = (vehicleId: string, token: string) =>
  transport.get(`/api/1/vehicles/${vehicleId}/vehicle_data`, VehicleDataResponseSchema, token);

export default vehicleData;
