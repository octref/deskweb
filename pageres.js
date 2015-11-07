var Pageres = require('pageres');

var pageres = new Pageres()
  .src('localhost:4000', ['800x1000'], { crop: true })
  .dest(__dirname)
  .run()
  .then(() => console.log('done'));

