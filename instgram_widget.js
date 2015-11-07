

var request = require('request');
    _       = require('lodash');

var req_image;

request({
	url: 'https://api.instagram.com/v1/tags/yhack/media/recent',
  qs: {
    access_token: "1977969628.a0965ff.ec2b60b9345f41828177c7e238353779"

  },
	headers: {
		"User-Agent": "hello"
	}
}, function(err, res, body){
	if (JSON.parse(body).meta.code === 200) {
		req_image = JSON.parse(body).data;
    var result = _.map(req_image, function(val) {
      return val.images.standard_resolution.url
    });
    require('fs').writeFileSync('build/imageList.json', JSON.stringify(result, null, 2), 'utf8');
	}
});
