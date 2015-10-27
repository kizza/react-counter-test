/** @jsx react.DOM */
"use strict";

var react     = require('react');

module.exports = react.createClass({
displayName: 'Counter',

  getInitialState: function() {
    return {
      label: this.props.label,
      value: 0
    };
  },

  getDefaultProps: function () {
    return { 
      incrementCallback: function(){},
      decrementCallback: function(){} 
    };
  },

  incrementCount: function(){
    this.setState({
      value: this.state.value + 1
    });
    this.props.incrementCallback();
  },

  decrementCount: function(){
    if (this.state.value > 0) {
      this.setState({
        value: this.state.value - 1
      });
      this.props.decrementCallback();
    }
  },

  render: function() {
    return <div className="Counter">
          <span>{this.state.label}: {this.state.value}</span>
          <button className="increment" onClick={this.incrementCount}>+</button> 
          <button className="decrement" onClick={this.decrementCount}>-</button>
        </div>;
  },
});
