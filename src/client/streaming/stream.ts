import WebSocket from 'ws';
import { TeslaApiEndpoints } from '../../constants.js';

function buildConnectMessage(vehicleId: string, token: string) {
  return {
    msg_type: 'data:subscribe_oauth',
    token,
    value: 'speed,odometer,soc,elevation,est_heading,est_lat,est_lng,power,shift_state,range,est_range,heading',
    tag: vehicleId,
  };
}

/**
 * Opens a websocket connection to the Tesla streaming API and subscribes to the vehicle's data.
 */
const stream = (vehicleId: string, token: string, onMessage: (data: unknown) => void) => {
  const connectMessage = buildConnectMessage(vehicleId, token);
  const ws = new WebSocket(TeslaApiEndpoints.STREAMING_API);

  ws.on('open', () => {
    console.log(`Connection opened for vehicle: ${vehicleId}`);
    ws.send(JSON.stringify(connectMessage));
  });
  ws.on('message', onMessage);
  ws.on('error', (err) => {
    console.error(`Error for vehicle ${vehicleId} : ${err.message}`);
  });
  ws.on('close', () => {
    console.log(`Connection closed for vehicle: ${vehicleId}`);
  });
};

export default stream;
