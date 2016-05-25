'use strict';

var express = require('express'),
    router = express.Router(),
    twitterRequest = require('./util').twitterRequest;


var root = "https://api.twitter.com/1.1";

var count = "count=5";

var user = "screen_name=nicolasjhampton";

var details = "skip_status=true&include_user_entities=false";


var getTimeline = function(req, res, next) {
  var path = `${root}/statuses/user_timeline.json?${count}&${user}`;
  twitterRequest(path, res, next);
};


var getFriends = function(req, res, next) {
  var path = `${root}/friends/list.json?${count}&${user}&${details}`;
  twitterRequest(path, res, next);
};


var getMessages = function(req, res, next) {
  var path = `${root}/direct_messages.json?${count}&${details}`;
  twitterRequest(path, res, next);
};


var renderTwitterAccount = function(req, res, next) {
  res.locals.timeline = res.locals.json[0];
  res.locals.friends = res.locals.json[1].users;
  res.locals.messages = res.locals.json[2];


  res.render('index');
}


router.get('/', getTimeline, getFriends, getMessages, renderTwitterAccount);

module.exports = router;
