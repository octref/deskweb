var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');

var InstagramWidget = React.createClass({
  getInitialState: function() {
    return {
      currentlist: this.props.newImageList,
      index: 0
    };
  },

  /*
   * Helper functions
   */
  switchImage: function() {
    if (this.state.index !== (this.state.currentlist.length - 1)) {
      this.setState({ index: this.state.index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  },

  sendUpdate: function() {
    $.post('http://localhost:4001', {
      markup: document.documentElement.innerHTML
    }, function() {
      console.log('Sent update to bgserver');
    });
  },

  /*
   * Lifecycle
   */
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentlist: nextProps.newImageList
    });
  },

  componentDidUpdate: function() {
    this.sendUpdate();
  },

  componentDidMount: function() {
    this.interval = setInterval(this.switchImage, 5000);
    this.sendUpdate();
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  /*
   * Render
   */
  render: function() {
    return (
      <img src={this.state.currentlist[this.state.index]} width="600" height="600"></img>
    );
  }
});

var newImageList = require('./imageList.json');

ReactDOM.render(
  <InstagramWidget newImageList={newImageList} />,
  document.getElementById('root')
);
