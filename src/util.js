'use strict';

var OAuth = require('OAuth'),
    api = require('./apiinfo'),
    Promise = require('bluebird');

var root = "https://api.twitter.com/1.1";
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


function createApiPath(obj) {
  return `${root}/${obj.endpoint}.json?${obj.options.join('&')}`;
}


var twitterRequest = function(obj, res, name) {
  return new Promise((resolve, reject) => {
    var path = createApiPath(obj);
    oauth.get(path, access_token, access_token_secret, (err, json) => {
      if(err) { return reject(err); }
      res.locals[name] = JSON.parse(json);
      resolve();
    });
  });
};

module.exports.twitterRequest = twitterRequest;
