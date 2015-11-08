var React = require('react');
var ReactDOM = require('react-dom');

var YHackWidget = require('./components/YHackWidget.js');

ReactDOM.render(
  <YHackWidget images={window.images} />,
  document.getElementById('root')
);
