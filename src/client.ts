import Auth from './auth.js';
import { FETCH_HEADERS, TeslaApiEndpoints } from './constants.js';

import GetVehiclesResponseSchema from './schemas/GetVehiclesResponseSchema.js';
import ChargeStateResponseSchema from './schemas/ChargeStateResponseSchema.js';
import ClimateStateResponseSchema from './schemas/ClimateStateResponseSchema.js';
import DriveStateResponseSchema from './schemas/DriveStateResponseSchema.js';
import GuiSettingsResponseSchema from './schemas/GuiSettingsResponseSchema.js';
import VehicleStateResponseSchema from './schemas/VehicleStateResponseSchema.js';
import VehicleConfigResponseSchema from './schemas/VehicleConfigResponseSchema.js';
import ReleaseNotesResponseSchema from './schemas/ReleaseNotesResponseSchema.js';
import GetVehicleResponseSchema from './schemas/GetVehicleResponseSchema.js';

export default class Client {
  public constructor(private readonly authenticator: Auth) {}

  /**
   * Get all vehicles associated with the account.
   * @returns The status of the vehicles associated with the account.
   */
  public async getVehicles() {
    return this.get('/api/1/vehicles', GetVehiclesResponseSchema);
  }

  /**
   * Get a vehicle by its ID.
   * @returns The vehicle status.
   */
  public async getVehicle(vehicleId: number) {
    return this.get(`/api/1/vehicles/${vehicleId}`, GetVehicleResponseSchema);
  }

  /**
   * Access the vehicle's data.
   */
  public state(vehicleId: number) {
    return {
      /**
       * @returns The charge state of the vehicle.
       */
      charge: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/charge_state`, ChargeStateResponseSchema),
      /**
       * @returns The climate state of the vehicle.
       */
      climate: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/climate_state`, ClimateStateResponseSchema),
      /**
       * @returns The drive state of the vehicle.
       */
      drive: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/drive_state`, DriveStateResponseSchema),
      /**
       * @returns The GUI settings of the vehicle.
       */
      gui: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/gui_settings`, GuiSettingsResponseSchema),
      /**
       * @returns The vehicle state.
       */
      state: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_state`, VehicleStateResponseSchema),
      /**
       * @returns The vehicle configuration.
       */
      config: () => this.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_config`, VehicleConfigResponseSchema),
      /**
       * @returns The release notes for the current software version of the vehicle.
       */
      releaseNotes: () => this.get(`/api/1/vehicles/${vehicleId}/release_notes`, ReleaseNotesResponseSchema),
    };
  }

  public commands(vehicleId: number) {
    return {
      /**
       * Wake up the vehicle.
       * @returns The vehicle's response to the wake up command.
       */
      wakeUp: () => this.post(`/api/1/vehicles/${vehicleId}/wake_up`, GetVehicleResponseSchema),
      /**
       * Starts charging the vehicle.
       */
      startCharge: () => this.post(`/api/1/vehicles/${vehicleId}/command/charge_start`),
      /**
       * Stops charging the vehicle.
       */
      stopCharge: () => this.post(`/api/1/vehicles/${vehicleId}/command/charge_stop`),
    };
  }

  private async get<T>(url: string, schema: Zod.Schema<T>): Promise<T | Error> {
    const accessToken = await this.authenticator.getAccessToken();
    if (accessToken instanceof Error) return new Error(accessToken.message);
    try {
      const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
        headers: {
          ...FETCH_HEADERS,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        return new Error('Failed to get vehicle data');
      }

      const parsed = schema.safeParse(await res.json());
      if (parsed.success) {
        return parsed.data;
      }
      return new Error(parsed.error.toString());
    } catch (error) {
      return new Error(`Failed to get: ${url}`);
    }
  }

  private async post<T>(url: string, schema?: Zod.Schema<T>, body?: Record<string, unknown>): Promise<T | Error> {
    const accessToken = await this.authenticator.getAccessToken();
    if (accessToken instanceof Error) return new Error(accessToken.message);
    try {
      const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
        method: 'POST',
        headers: {
          ...FETCH_HEADERS,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        return new Error('Failed to post');
      }

      const resJson = (await res.json()) as Record<string, unknown>;
      if (!schema) {
        return resJson?.result as T;
      }

      const parsed = schema.safeParse(resJson);
      if (parsed.success) {
        return parsed.data;
      }
      return new Error(parsed.error.toString());
    } catch (error) {
      return new Error(`Failed to post: ${url}`);
    }
  }
}
