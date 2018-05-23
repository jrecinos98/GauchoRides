import React from 'react';
import HistoryScreen from '../../src/screens/HistoryScreen';
import renderer from 'react-test-renderer';
import Database from '../../src/Database';
import User from '../../src/actors/User';
import Ride from '../../src/actors/Ride';
import { COLOR } from '../../src/Constants';

var object;

// Test constructor
test('Test: constructor(props)', () => {
	User.currentUser = {rides: []};
	object = renderer.create(<HistoryScreen />).getInstance();
});

// Test color theme
test('Test: color theme', () => {
	let theme_light_test = (object.state.color_theme === COLOR.THEME_LIGHT);
	let theme_dark_test = (object.state.color_theme === COLOR.THEME_DARK);
	let theme_classic_test = (object.state.color_theme === COLOR.THEME_CLASSIC);
	expect(theme_light_test || theme_dark_test || theme_classic_test).toBe(true);
});
