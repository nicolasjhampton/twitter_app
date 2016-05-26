'use strict';

var OAuth = require('OAuth'),
    api = require('./apiinfo'),
    Promise = require('bluebird');


var consumer_key = api.key;
var consumer_secret = api.secret;
var access_token = api.token;
var access_token_secret = api.tokenSecret;

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  consumer_key,
  consumer_secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);


var twitterRequest = function(path, res, name) {
  return new Promise(function(resolve, reject) {
    console.log(name); // First call will run "timeline, friends, messages"
    oauth.get(path, access_token, access_token_secret, function(err, json, response) {
      if(err) { return reject(err); }
      res.locals[name] = JSON.parse(json);
      console.log(name); // Second call will be in asynchronious, random order
      resolve();
    });
  });
};


module.exports.twitterRequest = twitterRequest;
