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

app.get('/', function (req, res) {
  res.json(liveConfig);
});

app.get('/water/off', function (req, res) {
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    liveConfig.power.waterPumps = false;
    d.send(JSON.stringify(liveConfig));

    res.json(liveConfig);
  });
});

app.get('/water/on', function (req, res) {
  devices.forEach(function(d) {

    // turn pumps off and send to client devices
    liveConfig.power.waterPumps = true;
    d.send(JSON.stringify(liveConfig));

    res.json(liveConfig);
  });
});

app.listen(3000, function () {
  console.log('app http listening on port 3000!');
});


/*
  WebSocket
  On Connection
*/
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

  // push to known devices
  devices.push(ws);

  // send current config
  ws.send(JSON.stringify(liveConfig));

  /* todo receive data
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });*/

});

console.log('Backend Server Online');
