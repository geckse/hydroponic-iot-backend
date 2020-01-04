/*
  Hydroponic IoT Backend
  Control of several
*/

var devices = []; // list of connected iot devices

// shared configs
var liveConfig = {
  power: {
    waterPumps: false,
    airPumps: false,
    lamp1: false,
    lamp2: false,
    lamp3: false
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
/*
  All Components control (for shutdown, e.q)
*/
app.get('/all/off', (req, res) => {

  for (var component in liveConfig.power) {
    if (Object.prototype.hasOwnProperty.call(liveConfig.power, component)) {
      liveConfig.power[component] = false;
    }
  }
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));

  });
  res.json(liveConfig);
});
app.get('/all/on', (req, res) => {

  for (var component in liveConfig.power) {
    if (Object.prototype.hasOwnProperty.call(liveConfig.power, component)) {
      liveConfig.power[component] = true;
    }
  }
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));

  });
  res.json(liveConfig);
});
/*
  Water Pump control
*/
app.get('/water/off', (req, res) => {
  liveConfig.power.waterPumps = false;
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));

  });
  res.json(liveConfig);
});

app.get('/water/on', (req, res) => {
  liveConfig.power.waterPumps = true;
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));
  });
  res.json(liveConfig);
});

/*
  Air Pump control
*/
app.get('/air/off', (req, res) => {
  liveConfig.power.airPumps = false;
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));

  });
  res.json(liveConfig);
});

app.get('/air/on', (req, res) => {
  liveConfig.power.airPumps = true;
  devices.forEach(function(d) {
    // turn pumps off and send to client devices
    d.send(JSON.stringify(liveConfig));
  });
  res.json(liveConfig);
});

/*
  Lamp control
*/
for(let i = 1; i <= 3; i++){
  app.get('/lamp'+i+'/off', (req, res) => {
    liveConfig.power['lamp'+i] = false;
    devices.forEach(function(d) {
      // turn pumps off and send to client devices
      d.send(JSON.stringify(liveConfig));

    });
    res.json(liveConfig);
  });

  app.get('/lamp'+i+'/on', (req, res) => {
    liveConfig.power['lamp'+i] = true;
    devices.forEach(function(d) {
      // turn pumps off and send to client devices
      d.send(JSON.stringify(liveConfig));
    });
    res.json(liveConfig);
  });
}

app.listen(8080, () => {
  console.log('Backend API listening on port 8080.');
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

console.log('Backend Websocket listening on port 3000.');
