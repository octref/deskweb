var path = require('path');

var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'site')));

app.listen(4000, function() {
  console.log('Serving at localhost:4000');
});


