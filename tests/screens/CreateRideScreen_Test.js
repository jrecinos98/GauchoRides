import React from 'react';
import CreateRideScreen from '../../src/screens/CreateRideScreen';
import renderer from 'react-test-renderer';
import Database from '../../src/Database';
import User from '../../src/actors/User';
import Ride from '../../src/actors/Ride';
import { COLOR } from '../../src/Constants';

var object;

// Test constructor
test('Test: constructor(props)', () => {
	object = renderer.create(<CreateRideScreen />).getInstance();
});

// Test color theme
test('Test: color theme', () => {
	let theme_light_test = (object.state.color_theme === COLOR.THEME_LIGHT);
	let theme_dark_test = (object.state.color_theme === COLOR.THEME_DARK);
	let theme_classic_test = (object.state.color_theme === COLOR.THEME_CLASSIC);
	expect(theme_light_test || theme_dark_test || theme_classic_test).toBe(true);
});

// Test extractCity function
test('Test: extractCity(text)', () => {
	expect(object.extractCity('12345 Some Road, Isla Vista, CA, USA')).toBe('Isla Vista, CA');
	expect(object.extractCity('Austin, TX, USA')).toBe('Austin, TX');
	expect(object.extractCity('Los Angeles, CA')).toBe('Los Angeles, CA');
	expect(object.extractCity('CA, USA')).toBe('CA');
	expect(object.extractCity('CA')).toBe('CA');
});

// Create a sample test ride on Database.
// function createTestRide(index) {
// 	let ride = new Ride(
// 		0,
// 		"Test Ride" + index,
// 		5,
// 		User.currentUser.id,
// 		{1000: true, 100: true},
// 		Math.floor(new Date() / 1000),
// 		new Area(34.415411, -119.858272, 5, "6586 Picasso Rd, Isla Vista, CA 93117"),
// 		new Area(34.045837, -118.257538, 5, "788 S Grand Ave, Los Angeles, CA 90017")
// 	);

// 	Database.createRide(ride);
// }

// // Get user's first ride from Database.
// function getTestRide() {
// 	let id = Object.keys(User.currentUser.rides)[0];
// 	Database.getRide(id, (ride) => {
// 		console.log(ride);
// 	});
// }
