const { WebcastPushConnection } = require('tiktok-live-connector'); // CommonJS syntax (server-side)
const WebSocket = require('ws'); // Use WebSocket for communication with the front-end
const wss = new WebSocket.Server({ port: 8080 }); // Create WebSocket server on port 8080

let tiktokUsername = 'noradin_muhamad_oficial';
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error('Failed to connect', err);
  });

// Send WebSocket message on chat event
tiktokLiveConnection.on('chat', (data) => {
  console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('dropBall'); // Send message to WebSocket clients
    }
  });
});

// Send WebSocket message on gift event
tiktokLiveConnection.on('gift', (data) => {
  console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('dropBall'); // Send message to WebSocket clients
    }
  });
});
