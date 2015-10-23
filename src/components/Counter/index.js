/** @jsx react.DOM */
"use strict";

var react     = require('react');

module.exports = react.createClass({
displayName: 'Counter',

	getInitialState: function() {
		return {
			label: this.props.label,
			total: 0,
		};
	},

	incrementCount: function(){
		this.setState({
			total: this.state.total + 1
		});
		this.props.incrementCallback();
	},

	decrementCount: function(){
		if (this.state.total > 0) {
			this.setState({
				total: this.state.total - 1
			});
			this.props.decrementCallback();
		}
	},

	render: function() {
		return <div className="Counter">
					{this.state.label}: {this.state.total} 
					<button onClick={this.incrementCount}>+</button> 
					<button onClick={this.decrementCount}>-</button>
				</div>;
	},
});
