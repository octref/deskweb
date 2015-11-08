// Given a tag, return a list of Instagram images associated with it

var path = require('path'),
    fs   = require('fs');

var request = require('request'),
    _       = require('lodash');

var INSTAGRAM_TOKEN = require('./secret/instagram_token.js');

module.exports = function(tag, cb) {
  request({
    url: `https://api.instagram.com/v1/tags/${tag}/media/recent`;
    qs: {
      access_token: INSTAGRAM_TOKEN
    },
    headers: {
      "User-Agent": "Deskweb"
    }
  }, function(err, res, body){
    if (res.statusCode === 200) {
      var images = _.reject(JSON.parse(body).data, function(image) {
        return image.type === "video";
      });

      var simplifiedImages = _.map(images, function(image) {
        return {
          id: image.id,
          url: image.images.standard_resolution.url
        };
      });

      cb(simplifiedImages);
    }
  });
};
