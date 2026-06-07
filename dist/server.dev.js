"use strict";

var path = require('path');

var express = require('express');

var cors = require('cors');

require('dotenv').config(); // const dns = require('node:dns/promises');
// dns.setServers(['1.1.1.1', '8.8.8.8']);


var port = process.env.PORT || 5000;

var connectDB = require('./config/db');

connectDB();
var app = express(); //static folder

app.use(express["static"](path.join(__dirname, 'public'))); //body parser middleware

app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //cors middleware

app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));
app.get('/', function (req, res) {
  //   console.log('Method:', req.method);
  //   console.log('Url:', req.url);
  //   console.log('Query:', req.query);
  //   console.log('Parms:', req.params);
  //   console.log('Body:', req.body);
  //   console.log('Headers:', req.headers);
  res.send({
    message: 'Testing random ideas app'
  });
}); //idea router

var ideasRouter = require('./routes/ideas');

var _require = require('mongoose'),
    connect = _require.connect;

app.use('/api/ideas', ideasRouter);
app.listen(port, function () {
  return console.log("Server listen on port ".concat(port));
});