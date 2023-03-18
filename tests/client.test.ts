import Authenticator from '../src/auth.js';
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
const FAKE_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5ZdVZJWTJTN3gxVHRYM01KMC1QMDJad3pBQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92MyIsImF1ZCI6Imh0dHBzOi8vYXV0aC50ZXNsYS5jb20vb2F1dGgyL3YzL3Rva2VuIiwiaWF0IjoxNjc2NzMyNDA0LCJzY3AiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiZGF0YSI6eyJ2IjoiMSIsImF1ZCI6Imh0dHBzOi8vb3duZXItYXBpLnRlc2xhbW90b3JzLmNvbS8iLCJzdWIiOiIyYTExZDAwZi03Yjk1LTRhNzMtOTg0Ni02Mzk0MWJhYzQyYzAiLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJhenAiOiJvd25lcmFwaSIsImFtciI6WyJwd2QiLCJtZmEiLCJvdHAiXSwiYXV0aF90aW1lIjoxNjc2NzMyNDA0fX0.2SaS0oUl2enja2VgWcstwWgp6iqHvXlEZ_CSxGCXl5k';

describe('client', () => {
  const auth = new Authenticator(FAKE_TOKEN, FAKE_REFRESH_TOKEN);
  const client = new Client(auth);

  it('should return an error if request failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = (await client.getVehicles()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to get vehicle data');
  });

  it('should return an error if parsing schema failed', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await client.getVehicles()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to validate schema');
  });

  it('should get all the vehicles', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehiclesResponse),
    }));

    const vehicles = await client.getVehicles();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await client.getVehicle(1234567890123456);
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle charge state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ChargeStatResponse),
    }));

    const vehicles = await client.state(1234567890123456).charge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle climate state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ClimateStateResponse),
    }));

    const vehicles = await client.state(1234567890123456).climate();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle drive state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(DriveStateResponse),
    }));

    const vehicles = await client.state(1234567890123456).drive();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle gui configuration', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GuiSettingsResponse),
    }));

    const vehicles = await client.state(1234567890123456).gui();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle state', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleStateResponse),
    }));

    const vehicles = await client.state(1234567890123456).state();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle config', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(VehicleConfigResponse),
    }));

    const vehicles = await client.state(1234567890123456).config();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should get a vehicle drive releaseNotes', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(ReleaseNotesResponse),
    }));

    const vehicles = await client.state(1234567890123456).releaseNotes();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should return an error if failed to post a command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await client.commands(1234567890123456).wakeUp()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to post');
  });

  it('should return an error if cannot parse response schema', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = (await client.commands(1234567890123456).wakeUp()) as Error;
    expect(vehicles).toBeInstanceOf(Error);
    expect(vehicles.message).toBe('Failed to parse post response schema');
  });

  it('should post the vehicle wakeup command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(GetVehicleResponse),
    }));

    const vehicles = await client.commands(1234567890123456).wakeUp();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should post the start charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await client.commands(1234567890123456).startCharge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });

  it('should post the stop charge command', async () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    const vehicles = await client.commands(1234567890123456).stopCharge();
    expect(vehicles).not.toBeInstanceOf(Error);
  });
});
