import { Client } from '../src/index.js';
import {
  GetVehiclesResponse,
  GetVehicleResponse,
  ChargeStatResponse,
  ClimateStateResponse,
  DriveStateResponse,
  GuiSettingsResponse,
  VehicleStateResponse,
  VehicleConfigResponse,
  ReleaseNotesResponse,
  VehicleDataResponse,
} from './data.js';

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5ZdVZJWTJTN3gxVHRYM01KMC1QMDJad3pBQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92MyIsImF1ZCI6WyJodHRwczovL293bmVyLWFwaS50ZXNsYW1vdG9ycy5jb20vIiwiaHR0cHM6Ly9hdXRoLnRlc2xhLmNvbS9vYXV0aDIvdjMvdXNlcmluZm8iXSwiYXpwIjoib3duZXJhcGkiLCJzdWIiOiIyYTExZDAwZi03Yjk1LTRhNzMtOTg0Ni02Mzk0MWJhYzQyYzAiLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOltdLCJleHAiOjE2NzkxMTEyMDAsImlhdCI6MTY3OTA4MjQwMH0.qqCBXDoAxj9BS5lF2UubBXwgsRR9UBIt6XgX20f_Nhg';

describe('client', () => {
  it('should return an error if request failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = await Client.vehicles(FAKE_TOKEN);
    expect(vehicles.success).toBe(false);
    expect(vehicles.data).toBeUndefined();
    expect(vehicles.error).toBeInstanceOf(Error);
    expect(vehicles.error?.message).toBe('Failed to get vehicle data');
  });

  it('should return an error if parsing schema failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.vehicles(FAKE_TOKEN);
    expect(vehicles.success).toBe(false);
    expect(vehicles.data).toBeUndefined();
    expect(vehicles.error?.message).toBe('Failed to validate schema');
  });

  it('should get the vehicle data', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleDataResponse),
    }));

    const vehicles = await Client.vehicleData('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get all the vehicles', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = await Client.vehicles(FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await Client.vehicle('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle charge state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ChargeStatResponse),
    }));

    const vehicles = await Client.charge('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle climate state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ClimateStateResponse),
    }));

    const vehicles = await Client.climate('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle drive state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(DriveStateResponse),
    }));

    const vehicles = await Client.drive('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle gui configuration', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GuiSettingsResponse),
    }));

    const vehicles = await Client.gui('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleStateResponse),
    }));

    const vehicles = await Client.state('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle config', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleConfigResponse),
    }));

    const vehicles = await Client.config('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should get a vehicle drive releaseNotes', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ReleaseNotesResponse),
    }));

    const vehicles = await Client.releaseNotes('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should return an error if failed to post a command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.wakeUp('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(false);
    expect(vehicles.data).toBeUndefined();
    expect(vehicles.error?.message).toBe('Failed to post');
  });

  it('should return an error if cannot parse response schema', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.wakeUp('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(false);
    expect(vehicles.data).toBeUndefined();
    expect(vehicles.error?.message).toBe('Failed to parse post response schema');
  });

  it('should post the vehicle wakeup command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await Client.wakeUp('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should post the start charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.startCharge('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });

  it('should post the stop charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.stopCharge('1234567890123456', FAKE_TOKEN);
    expect(vehicles.success).toBe(true);
  });
});
