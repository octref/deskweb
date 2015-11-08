/*
 * caption
 * url
 * username
 * likes
 *
 * empty
 */

var React = require('react');

var _ = require('lodash');

var $ = require('jquery');

var YHackImage = React.createClass({
  render: function() {
    var className = this.props.image.empty ? 'E-img' : 'Y-img';

    return (
      <div key={_.uniqueId()} className={className}>
        <img src={this.props.image.url} width="150" height="150"></img>
      </div>
    );
  }
});

var YHackRow = React.createClass({
  render: function() {
    var images = _.map(this.props.images, function(image) {
      return (
        <YHackImage image={image} />
      );
    });

    return (
      <div className='Y-row'>
        {images}
      </div>
    );
  }
});

var YHackWidget = React.createClass({
  getInitialState: function() {

  },

  render: function() {
    var images = this.props.images;

    var biImgMatrix = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ];

    var imgMatrix = _.map(biImgMatrix, function(biImgRow) {
      return _.map(biImgRow, function(biImg) {
        if (biImg === 1) {
          return images.shift();
        } else {
          return { empty: true };
        }
      });
    });

    var elements = _.map(imgMatrix, function(imgRow) {
      return <YHackRow key={_.uniqueId()} images={imgRow} />;
    });

    return (
      <div className='Y-widget'>
        {elements}
      </div>
    );
  }
});

module.exports = YHackWidget;
