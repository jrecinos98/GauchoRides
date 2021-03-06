import React from 'react';
import renderer from 'react-test-renderer';
import User from '../../src/actors/User';
import Constants from '../../src/Constants';
import CreateRequestScreen from "../../src/screens/CreateRequestScreen";

var object;

// Test constructor
test('Test: constructor(props)', () => {
	User.currentUser = {rides: []};
	object = renderer.create(<CreateRequestScreen />).getInstance();
});

// Test color theme
test('Test: color theme', () => {
	let theme_light_test = (object.state.color_theme === Constants.COLOR.THEME_LIGHT);
	let theme_dark_test = (object.state.color_theme === Constants.COLOR.THEME_DARK);
	let theme_classic_test = (object.state.color_theme === Constants.COLOR.THEME_CLASSIC);
	expect(theme_light_test || theme_dark_test || theme_classic_test).toBe(true);
});
