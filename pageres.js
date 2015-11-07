var path = require('path');

var Pageres = require('pageres');

var config = require('./config.json');

var RESOLUTION = config.window.width + 'x' + config.window.height;

var pageres = new Pageres()
  .src('localhost:4000', [RESOLUTION], { crop: true, filename: 'desktop' })
  .dest(__dirname)
  .run()
  .then(() => console.log('done'));
