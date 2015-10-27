/** @jsx react.DOM */
"use strict";

var react     = require('react');

module.exports = react.createClass({
  displayName: 'Counter',

  propTypes: {
    label: react.PropTypes.string,
    onIncrement: react.PropTypes.func,
    onDecrement: react.PropTypes.func
  },

  getInitialState: function() {
    return {
      label: this.props.label,
      value: 0
    };
  },

  getDefaultProps: function () {
    return { 
      onIncrement: function(){},
      onDecrement: function(){} 
    };
  },

  incrementCount: function(){
    this.setState({
      value: this.state.value + 1
    });
    this.props.onIncrement();
  },

  decrementCount: function(){
    if (this.state.value > 0) {
      this.setState({
        value: this.state.value - 1
      });
      this.props.onDecrement();
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
