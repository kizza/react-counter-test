/** @jsx react.DOM */
"use strict";

var react     = require('react');
var Counter = require('./../../components/Counter');

module.exports = react.createClass({
  displayName: 'App',

  getInitialState: function() {
    return {
      counters:[],
      total: 0
    };
  },

  incrementTotal: function(){
    this.setState({
      total: this.state.total + 1
    });
  },

  decrementTotal: function(){
    this.setState({
      total: this.state.total - 1
    });
  },

  addCounterCallback: function(e) {
    e.preventDefault();
    var input = this.refs.counterName.getDOMNode();
    var counterName = input.value.trim();
    input.value = '';
    this.createNewCounter(counterName);
  },

  createNewCounter:function(counterName){
    if (!counterName){
      alert('Please enter a counter name');
      return;
    }
    var counters = this.state.counters;
    counters.push({
      'id': 'counter-'+counters.length,
      'label': counterName,
      'incrementCallback': this.incrementTotal,
      'decrementCallback': this.decrementTotal
    });
    this.setState({counters: counters});
    return counters;
  },

  render: function() {
    var counters = this.state.counters;
    return <div className="App">
        <h1>Counter App</h1>
        <h2>Total: {this.state.total}</h2>
        <p id="counters">
        {
          counters.map(function(result) {
            return (
              <Counter type="text" key={result.id} label={result.label} 
                incrementCallback={result.incrementCallback} 
                decrementCallback={result.decrementCallback} />
            )}, this)
        }  
        </p> 
        <form onSubmit={this.addCounterCallback}>
          <p>New counter <input type="text" placeholder="Counter Name" ref="counterName" />
          <button type="submit">Add</button></p>
        </form>
      </div>;
  },
});
