var devices = [];
var liveConfig = {
  power: {
    waterPumps: false,
  }
};

/*
  Simple HTTP Server
*/
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json(liveConfig);
});

app.get('/water/off', (req, res) => {
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    liveConfig.power.waterPumps = false;
    d.send(JSON.stringify(liveConfig));

    res.json(liveConfig);
  });
});

app.get('/water/on', (req, res) => {
  devices.forEach(function(d) {

    // turn pumps off and send to client devices
    liveConfig.power.waterPumps = true;
    d.send(JSON.stringify(liveConfig));

    res.json(liveConfig);
  });
});

app.listen(8080, () => {
  console.log('Backend API listening on port 3000.');
});


/*
  WebSocket
  On Connection
*/
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log("New IoT Device Connection");
  // push to known devices
  devices.push(ws);

  // send current config
  ws.send(JSON.stringify(liveConfig));

  /* todo receive data
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });*/

});

console.log('Backend Websocket listening on port 8080.');
