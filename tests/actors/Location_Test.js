import React from 'react';
import Location from '../../src/actors/Location';
import renderer from 'react-test-renderer';

// Test constructor
test('Test: constructor', () => {
	let loc = new Location(34, 112);
	expect(loc).toEqual({
		latitude: 34,
		longitude: 112
	});
});
