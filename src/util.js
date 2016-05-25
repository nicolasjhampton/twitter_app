'use strict';

var OAuth = require('OAuth'),
    api = require('./apiinfo');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  api.key,
  api.secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);


var twitterRequest = function(path, res, next) {
  oauth.get(path, api.token, api.tokenSecret, function(err, json, response) {
    json = JSON.parse(json);
    res.locals.json = res.locals.json || [];
    res.locals.json.push(json);
    console.log(response.statusMessage);
    next();
  });
};


module.exports.twitterRequest = twitterRequest;
