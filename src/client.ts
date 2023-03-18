import Zod from 'zod';
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
  /**
   * Get all vehicles associated with the account.
   * @returns The status of the vehicles associated with the account.
   */
  public static vehicles(token: string) {
    return Client.get('/api/1/vehicles', GetVehiclesResponseSchema, token);
  }

  /**
   * Get a vehicle by its ID.
   * @returns The vehicle status.
   */
  public static vehicle(vehicleId: number, token: string) {
    return Client.get(`/api/1/vehicles/${vehicleId}`, GetVehicleResponseSchema, token);
  }

  /**
   * Access the vehicle's data.
   */
  public static state(vehicleId: number, token: string) {
    return {
      /**
       * @returns The charge state of the vehicle.
       */
      charge: () =>
        Client.get(`/api/1/vehicles/${vehicleId}/data_request/charge_state`, ChargeStateResponseSchema, token),
      /**
       * @returns The climate state of the vehicle.
       */
      climate: () =>
        Client.get(`/api/1/vehicles/${vehicleId}/data_request/climate_state`, ClimateStateResponseSchema, token),
      /**
       * @returns The drive state of the vehicle.
       */
      drive: () => Client.get(`/api/1/vehicles/${vehicleId}/data_request/drive_state`, DriveStateResponseSchema, token),
      /**
       * @returns The GUI settings of the vehicle.
       */
      gui: () => Client.get(`/api/1/vehicles/${vehicleId}/data_request/gui_settings`, GuiSettingsResponseSchema, token),
      /**
       * @returns The vehicle state.
       */
      state: () =>
        Client.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_state`, VehicleStateResponseSchema, token),
      /**
       * @returns The vehicle configuration.
       */
      config: () =>
        Client.get(`/api/1/vehicles/${vehicleId}/data_request/vehicle_config`, VehicleConfigResponseSchema, token),
      /**
       * @returns The release notes for the current software version of the vehicle.
       */
      releaseNotes: () => Client.get(`/api/1/vehicles/${vehicleId}/release_notes`, ReleaseNotesResponseSchema, token),
    };
  }

  public static commands(vehicleId: number, token: string) {
    return {
      /**
       * Wake up the vehicle.
       * @returns The vehicle's response to the wake up command.
       */
      wakeUp: () => Client.post(`/api/1/vehicles/${vehicleId}/wake_up`, token, GetVehicleResponseSchema),
      /**
       * Starts charging the vehicle.
       */
      startCharge: () => Client.post(`/api/1/vehicles/${vehicleId}/command/charge_start`, token),
      /**
       * Stops charging the vehicle.
       */
      stopCharge: () => Client.post(`/api/1/vehicles/${vehicleId}/command/charge_stop`, token),
    };
  }

  private static async get<T>(url: string, schema: Zod.Schema<T>, token: string): Promise<T | Error> {
    try {
      const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
        headers: {
          ...FETCH_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        return new Error('Failed to get vehicle data');
      }

      const parsed = schema.safeParse(await res.json());
      if (parsed.success) {
        return parsed.data;
      }
      return new Error('Failed to validate schema');
    } catch (error) {
      return new Error(`Failed to get: ${url}`);
    }
  }

  private static async post<T>(
    url: string,
    token: string,
    schema?: Zod.Schema<T>,
    body?: Record<string, unknown>,
  ): Promise<T | Error> {
    try {
      const res = await fetch(TeslaApiEndpoints.OWNER_API_URL + url, {
        method: 'POST',
        headers: {
          ...FETCH_HEADERS,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      return new Error('Failed to parse post response schema');
    } catch (error) {
      return new Error(`Failed to post: ${url}`);
    }
  }
}
