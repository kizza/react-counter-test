/** @jsx react.DOM */
"use strict";

jest.autoMockOff();

describe('App', function() {
  var react  = require('react/addons');
  var App = require('../index');
  var Counter = require('../../Counter/index');
  var TestUtils = react.addons.TestUtils;
  var findByType = TestUtils.findRenderedComponentWithType;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var findByTag = TestUtils.findRenderedDOMComponentWithTag;
  var scryByType = TestUtils.scryRenderedComponentsWithType;
  var simulateClick = TestUtils.Simulate.click;
  var simulateSubmit = TestUtils.Simulate.submit;
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<App/>);
  });

  it('should render the App header', function() {
    var header = findByTag(component, 'h1');
    expect(header.getDOMNode().textContent).toBe('Counter App');
  });

  it('should initially have total of 0', function() {
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

  it('should be able to increment total', function() {
    component.incrementTotal();
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 1');
  });

  it('should be able to decrement total', function() {
    component.setState({total: 1});
    component.decrementTotal();
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

  it('should start with 0 counters', function() {
    var counters = scryByType(component, Counter);
    expect(counters.length).toBe(0);
  });

  it('should be able to add a child counter', function() {
    component.createNewCounter('Test counter');
    var counters = scryByType(component, Counter);
    expect(counters.length).toBe(1);
  });

  it('should be able to create a counter by name', function() {
    var counterName = findByTag(component, 'input');
    counterName.getDOMNode().value = 'Custom name';
    var form = findByTag(component, 'form');
    simulateSubmit(counterName);
    var counter = findByType(component, Counter);
    var counterLabel = findByTag(counter, 'span');
    expect(counterLabel.getDOMNode().textContent).toBe('Custom name: 0');
  });

  it('should increment total from single child counter', function() {
    component.createNewCounter('Test counter');
    var counter = findByType(component, Counter);
    var incrementButton = findByClass(counter, 'increment');
    simulateClick(incrementButton.getDOMNode());
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 1');
  });

  it('should increment total from multiple child counters', function() {
    component.createNewCounter('Test counter 1');
    component.createNewCounter('Test counter 2');

    var counters = scryByType(component, Counter);
    var incrementButton;
    for (var i=0; i<counters.length; i++){
      incrementButton = findByClass(counters[i], 'increment');
      simulateClick(incrementButton.getDOMNode());
    }
    
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 2');
  });

  it('should decrement total from single child counter', function() {
    component.createNewCounter('Test counter');
    var counter = findByType(component, Counter);
    counter.setState({ value: 1 });
    component.setState({ total: 1 });

    var decrementButton = findByClass(counter, 'decrement');
    simulateClick(decrementButton.getDOMNode());
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

  it('should decrement total from multiple child counters', function() {
    var i, decrementButton;
    component.createNewCounter('Test counter 1')
    component.createNewCounter('Test counter 2');
    var counters = scryByType(component, Counter);

    // Set state
    component.setState({ total: 2 });
    for (i=0; i<counters.length; i++){
      counters[i].setState({ value: 1 });
    }

    // Change state
    for (i=0; i<counters.length; i++){
      decrementButton = findByClass(counters[i], 'decrement');
      simulateClick(decrementButton.getDOMNode());
    }
    
    var totalLabel = findByTag(component, 'h2');
    expect(totalLabel.getDOMNode().textContent).toBe('Total: 0');
  });

});
