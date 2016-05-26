'use strict';

var express = require('express'),
    router = express.Router(),
    Promise = require('bluebird'),
    twitterRequest = require('./util').twitterRequest;


var count = "count=5";
var user = "screen_name=nicolasjhampton";
var details = "skip_status=true&include_user_entities=false";

var requests = {
  "timeline":{"endpoint":"statuses/user_timeline", "options":[count, user]},
  "friends":{"endpoint":"friends/list", "options":[count, user, details]},
  "messages":{"endpoint":"direct_messages", "options":[count, details]}
};


var getTwitterInfo = (req, res, next) => {
  var pending = Object.keys(requests).map(function(key) {
    return twitterRequest(requests[key], res, key);
  });
  // // Non-blocking, asynchronous request
  Promise.all(pending).then(function() {
    next();
  });
};


var renderTwitterAccount = function(req, res, next) {
  res.locals.friends = res.locals.friends.users;
  res.render('index');
};


router.get('/', getTwitterInfo, renderTwitterAccount);

module.exports = router;
