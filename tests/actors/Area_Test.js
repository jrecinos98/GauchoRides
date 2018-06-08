import React from 'react';
import Area from '../../src/actors/Area';
import renderer from 'react-test-renderer';

// Test constructor
test('Test: constructor', () => {
    let area = new Area({
        latitude: 34,
        longitude: 112,
        radius: 5,
        name: "Area"
    });
    expect(area.toObject()).toEqual({
        latitude: 34,
        longitude: 112,
        radius: 5,
        name: "Area"
    });
});
