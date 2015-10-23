/** @jsx react.DOM */
"use strict";

jest.autoMockOff();

describe('Counter', function() {
	var react  = require('react/addons');
	var Counter = require('../index');
	var TestUtils = react.addons.TestUtils;
	var findByType = TestUtils.findRenderedComponentWithType;
	var findByClass = TestUtils.findRenderedDOMComponentWithClass;
	var findByTag = TestUtils.findRenderedDOMComponentWithTag;
	var simulateClick = TestUtils.Simulate.click;
	var component;

	beforeEach(function() {
		component = TestUtils.renderIntoDocument(<Counter label="Test" />);
	});

	it('should render the Counter initial value of 0', function() {
		var label = findByTag(component, 'span');
		expect(label.getDOMNode().textContent).toBe('Test: 0');
	});

	it('should increment to 1 when "+" button pressed', function() {
		var incrementButton = findByClass(component, 'increment')
		simulateClick(incrementButton.getDOMNode());

		var label = findByTag(component, 'span');
		expect(label.getDOMNode().textContent).toBe('Test: 1');
	});

	it('should not decrement below 0', function() {
		component.decrementCount(); 
		var label = findByTag(component, 'span');
		expect(label.getDOMNode().textContent).toBe('Test: 0');
	});

	it('should decrement to 0 after pressing "+" then "-"', function() {
		var incrementButton = findByClass(component, 'increment')
		simulateClick(incrementButton.getDOMNode());

		var decrementButton = findByClass(component, 'decrement')
		simulateClick(decrementButton.getDOMNode());

		var label = findByTag(component, 'span');
		expect(label.getDOMNode().textContent).toBe('Test: 0');
	});

	it('should run callback when "+" button pressed', function() {
		component.setProps({ incrementCallback: jest.genMockFunction() });
		var incrementButton = findByClass(component, 'increment');
		simulateClick(incrementButton.getDOMNode());
		expect(component.props.incrementCallback).toBeCalled();
	});

	it('should run callback when "-" button pressed', function() {
		component.setState({ value: 1 });
		component.setProps({ decrementCallback: jest.genMockFunction() });
		var decrementButton = findByClass(component, 'decrement');
		simulateClick(decrementButton.getDOMNode());
		expect(component.props.decrementCallback).toBeCalled();
	});

});
