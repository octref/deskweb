var path = require('path');

// Express setup
var express = require('express');
var logger = require('morgan');
var app = express();

app.set('view engine', 'jade');
app.use(logger('dev'));

// Other requires
var instagramAPI = require('./instagramAPI.js');

// Constants
var TAG = 'yhack';

/*
 * Express
 */

// Static file
app.use('/static', express.static(path.join(__dirname + '/static')));

// Root
app.use('/', function(req, res) {
  instagramAPI.getTagImages(TAG, function(simplifiedImages) {
    res.render('index', { images: simplifiedImages });
  });
});

app.listen(4000, function() {
  console.log('Serving at localhost:4000');
});
