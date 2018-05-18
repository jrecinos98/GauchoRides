import React from 'react';
import User from '../../src/actors/User';
import renderer from 'react-test-renderer';

// Test constructor
test('Test: constructor', () => {
	let user = new User({
		id: 0,
		fbID: 0,
		name: "Name",
		email: "Email",
		description: "something",
		sexy_rating: 4.5,
		drive_rating: 1.2,
		tags: {},
		rides: {},
		follows: {}
	},false);
	expect(user.toObject()).toEqual({
		id: 0,
		fbID: 0,
		name: "Name",
		email: "Email",
		description: "something",
		sexy_rating: 4.5,
		drive_rating: 1.2,
		tags: {},
		rides: {},
		follows: {}
	});
});
