'use strict';

var express = require('express'),
    http = require('http'),
    app = express(),
    router = require('./routes');

app.use('/', router);

http.createServer(app).listen(3000);
