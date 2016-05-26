'use strict';

var express = require('express'),
    router = express.Router(),
    Promise = require('bluebird'),
    twitterRequest = require('./util').twitterRequest;

var root = "https://api.twitter.com/1.1";
var count = "count=5";
var user = "screen_name=nicolasjhampton";
var details = "skip_status=true&include_user_entities=false";

var timeline = `${root}/statuses/user_timeline.json?${count}&${user}`;
var friends = `${root}/friends/list.json?${count}&${user}&${details}`;
var messages = `${root}/direct_messages.json?${count}&${details}`;


var getTwitterInfo = function(req, res, next) {
  var requests = [twitterRequest(timeline, res, "timeline"),
                  twitterRequest(friends, res, "friends"),
                  twitterRequest(messages, res, "messages")];
  // Non-blocking, asynchronous request
  Promise.all(requests).then(function() {
    next();
  });
};


var renderTwitterAccount = function(req, res, next) {
  res.locals.friends = res.locals.friends.users;
  res.render('index');
};


router.get('/', getTwitterInfo, renderTwitterAccount);

module.exports = router;
