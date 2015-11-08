var React = require('react');

var _ = require('lodash');

var $ = require('jquery');

var YHackImage = React.createClass({
  render: function() {
    if (this.props.image.empty) {
      return (
        <div key={_.uniqueId()} className={'E-img'}>
          <img src={this.props.image.url} width="150" height="150"></img>
        </div>
      );
    } else {
      var classes = 'Y-img';
      if (!this.props.image.visible) {
        classes += ' invis';
      }

      return (
        <div key={_.uniqueId()} className={classes}>
          <img src={this.props.image.url} width="150" height="150"></img>
        </div>
      );
    }
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
    return {
      index: 0,
      visibilityArr: [false, false, false, false, false, false, false, false]
    };
  },

  /*
   * Helper functions
   */

  sendUpdate: function() {
    $.post('http://localhost:4001', {
      markup: document.documentElement.innerHTML
    }, function() {
      console.log('Sent update to bgserver');
    });
  },

  updateVisibility: function() {
    var currVisibilityArr = this.state.visibilityArr;
    currVisibilityArr[this.state.index] = true;
    console.log(currVisibilityArr, this.state.index);
    this.setState({ visibilityArr: currVisibilityArr, index: (this.state.index + 1) % 8 });
  },

  /*
   * Lifecycle
   */
  componentDidMount() {
    this.sendUpdate();

    setInterval(this.updateVisibility, 2000);
  },

  componentDidUpdate: function() {
    this.sendUpdate();
  },

  render: function() {
    var visibilityArr = this.state.visibilityArr;

    _.forEach(images, function(image, index) {
      image.visible = visibilityArr[index];
    });

    console.log('Updated images', _.pluck(images, 'caption'));

    var biImgMatrix = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ];

    var count = 0;
    var imgMatrix = _.map(biImgMatrix, function(biImgRow) {
      return _.map(biImgRow, function(biImg) {
        if (biImg === 1) {
          return images[count++];
        } else {
          return { empty: true, visible: false };
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
