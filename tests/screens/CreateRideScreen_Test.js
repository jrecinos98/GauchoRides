import React from 'react';
import CreateScreen from '../../src/screens/CreateScreen';
import renderer from 'react-test-renderer';
import Constants from '../../src/Constants';

var object;

// Test constructor
test('Test: constructor(props)', () => {
	object = renderer.create(<CreateScreen />).getInstance();
});

// Test color theme
test('Test: color theme', () => {
	let theme_light_test = (object.state.color_theme === Constants.COLOR.THEME_LIGHT);
	let theme_dark_test = (object.state.color_theme === Constants.COLOR.THEME_DARK);
	let theme_classic_test = (object.state.color_theme === Constants.COLOR.THEME_CLASSIC);
	expect(theme_light_test || theme_dark_test || theme_classic_test).toBe(true);
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
