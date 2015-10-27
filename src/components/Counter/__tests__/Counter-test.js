/** @jsx react.DOM */
"use strict";

jest.autoMockOff();

describe('Counter', function() {
  var react  = require('react/addons');
  var Counter = require('../index');
  var TestUtils = react.addons.TestUtils;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var findByTag = TestUtils.findRenderedDOMComponentWithTag;
  var simulateClick = TestUtils.Simulate.click;
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<Counter label="Test" />);
  });

  it('should render with initial value of 0', function() {
    var label = findByTag(component, 'span');
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should increment when "+" button pressed', function() {
    var incrementButton = findByClass(component, 'increment');
    var label = findByTag(component, 'span');
    simulateClick(incrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 1');
  });

  it('should not decrement below 0', function() {
    // component.decrementCount(); 
    var label = findByTag(component, 'span');
    var decrementButton = findByClass(component, 'decrement');
    simulateClick(decrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should decrement to 0 after incrementing first', function() {
    var incrementButton = findByClass(component, 'increment');
    var decrementButton = findByClass(component, 'decrement');
    var label = findByTag(component, 'span');
    simulateClick(incrementButton.getDOMNode());
    simulateClick(decrementButton.getDOMNode());
    expect(label.getDOMNode().textContent).toBe('Test: 0');
  });

  it('should run callback function when incremented', function() {
    var incrementButton = findByClass(component, 'increment');
    component.setProps({ onIncrement: jest.genMockFunction() });
    simulateClick(incrementButton.getDOMNode());
    expect(component.props.onIncrement).toBeCalled();
  });

  it('should run callback function when decremented', function() {
    var decrementButton = findByClass(component, 'decrement');
    component.setState({ value: 1 });
    component.setProps({ onDecrement: jest.genMockFunction() });
    simulateClick(decrementButton.getDOMNode());
    expect(component.props.onDecrement).toBeCalled();
  });

  it('should not run callback function when decrementing below 0', function() {
    var decrementButton = findByClass(component, 'decrement');
    component.setProps({ onDecrement: jest.genMockFunction() });
    simulateClick(decrementButton.getDOMNode());
    expect(component.props.onDecrement).not.toBeCalled();
  });

});