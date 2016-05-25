'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    router = require('./routes');

app.use('/', router);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'jade');

app.set('views', path.join(__dirname, 'templates'));

http.createServer(app).listen(3000);
