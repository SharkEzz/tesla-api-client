import Client from '../src/client.js';
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
} from './data.js';

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5ZdVZJWTJTN3gxVHRYM01KMC1QMDJad3pBQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92MyIsImF1ZCI6WyJodHRwczovL293bmVyLWFwaS50ZXNsYW1vdG9ycy5jb20vIiwiaHR0cHM6Ly9hdXRoLnRlc2xhLmNvbS9vYXV0aDIvdjMvdXNlcmluZm8iXSwiYXpwIjoib3duZXJhcGkiLCJzdWIiOiIyYTExZDAwZi03Yjk1LTRhNzMtOTg0Ni02Mzk0MWJhYzQyYzAiLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOltdLCJleHAiOjE2NzkxMTEyMDAsImlhdCI6MTY3OTA4MjQwMH0.qqCBXDoAxj9BS5lF2UubBXwgsRR9UBIt6XgX20f_Nhg';

describe('client', () => {
  it('should return an error if request failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = (await Client.vehicles(FAKE_TOKEN)) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to get vehicle data');
  });

  it('should return an error if parsing schema failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await Client.vehicles(FAKE_TOKEN)) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to validate schema');
  });

  it('should get all the vehicles', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = await Client.vehicles(FAKE_TOKEN);
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await Client.vehicle(1234567890123456, FAKE_TOKEN);
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle charge state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ChargeStatResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).charge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle climate state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ClimateStateResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).climate();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle drive state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(DriveStateResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).drive();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle gui configuration', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GuiSettingsResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).gui();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleStateResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).state();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle config', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleConfigResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).config();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle drive releaseNotes', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ReleaseNotesResponse),
    }));

    const vehicles = await Client.state(1234567890123456, FAKE_TOKEN).releaseNotes();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should return an error if failed to post a command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await Client.commands(1234567890123456, FAKE_TOKEN).wakeUp()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to post');
  });

  it('should return an error if cannot parse response schema', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await Client.commands(1234567890123456, FAKE_TOKEN).wakeUp()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to parse post response schema');
  });

  it('should post the vehicle wakeup command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await Client.commands(1234567890123456, FAKE_TOKEN).wakeUp();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should post the start charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.commands(1234567890123456, FAKE_TOKEN).startCharge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should post the stop charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await Client.commands(1234567890123456, FAKE_TOKEN).stopCharge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });
});
