/** @jsx react.DOM */
"use strict";

var react     = require('react');
var Counter = require('./../../components/Counter');

module.exports = react.createClass({
displayName: 'App',

	getInitialState: function() {
		return {
			total: 0,
			counters:[]
		};
	},

	incrementCount: function(){
		this.setState({
			total: this.state.total + 1
		});
	},

	decrementCount: function(){
		this.setState({
			total: this.state.total - 1
		});
	},

	addCounter: function(e) {
		e.preventDefault();
		// Get data
		var input = this.refs.counterName.getDOMNode();
		var counterName = input.value.trim();
		input.focus();
		input.value = '';
		if (!counterName){
			alert('Please enter a counter name');
			return;
		}

		// Add counter
		var counters = this.state.counters;
		counters.push({
			'key': 'counter-'+counters.length,
			'label': counterName,
			'incrementCallback': this.incrementCount,
			'decrementCallback': this.decrementCount
		});
		this.setState({counters: counters});
	},

	render: function() {
		var counters = this.state.counters;
		return <div className="App">
				<h1>Counter App</h1>
				<h2>Total: {this.state.total}</h2>
				<div id="counters">
				{
					counters.map(function(result) {
					return (
						<Counter type="text" key={result.id} label={result.label} 
							incrementCallback={result.incrementCallback} 
							decrementCallback={result.decrementCallback} />
					);
		      }, this)}
				</div> 
				<form onSubmit={this.addCounter}>
					<input type="text" placeholder="Counter Name" ref="counterName" />
					<input type="submit" value="Add" />
				</form>
			</div>;
	},
});
