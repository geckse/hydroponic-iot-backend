const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

/*
  On Connection
*/
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(`{
    "power": {
      "waterPumps": true
    }
  }`);
});

console.log('Backend Server Online');
