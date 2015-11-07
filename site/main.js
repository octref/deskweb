var React = require('react');
var ReactDOM = require('react-dom');

var InstagramWidget = React.createClass({
  getInitialState: function() {
      return {
          currentlist: this.props.newImageList,
          index: 0
      };
  },
  componentWillReceiveProps: function(nextProps) {
    // var newlist=[];
    // for (i = 0; i < this.props.imageList.length; i++) {
    //   if (!_.includes(this.state.currentlist, this.props.newImageList[i])){
    //     newlist.push(this.props.newImageList[i]);
    //   }
    // }
    this.setState({
        currentlist: nextProps.newImageList
    });
  },

  switchImage: function() {
    if (this.state.index !== (this.state.currentlist.length-1)) {

      this.setState({
        index: this.state.index + 1, 
      });
    }
    else {
      this.setState({
        index: 0
      });
    }
  },

  componentDidMount: function() {
    this.interval = setInterval(this.switchImage, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <img src={this.state.currentlist[this.state.index]} width="600" height="600"></img>
 
    );
  }
});

// var i = 0;
// var imageList = require('./imageList.json');
// var list1 = imageList.slice(0, 4);
// var list2 = imageList.slice(2, 6);
// var list3 = imageList.slice(7, 11);
// var list4 = imageList.slice(11, 15);
// var lists = [list1, list2, list3, list4];
var imageFeedHandler = function () {
  var newImageList = require('./imageList.json');
  ReactDOM.render(
    <InstagramWidget newImageList= {newImageList} />,
    document.getElementById('root')
  );
};

imageFeedHandler();
setInterval(imageFeedHandler, 10000);
