import React from 'react';
import HomeScreen from '../../src/screens/HomeScreen';
import renderer from 'react-test-renderer';
import Constants from '../../src/Constants';

var object;

// Test constructor
test('Test: constructor(props)', () => {
	object = renderer.create(
		<HomeScreen 
			screenProps={{rootNavigation: {navigate: (something) => { /*stub*/ }}}}
		/>
	).getInstance();
});

// Test color theme
test('Test: color theme', () => {
	let theme_light_test = (object.state.color_theme === Constants.COLOR.THEME_LIGHT);
	let theme_dark_test = (object.state.color_theme === Constants.COLOR.THEME_DARK);
	let theme_classic_test = (object.state.color_theme === Constants.COLOR.THEME_CLASSIC);
	expect(theme_light_test || theme_dark_test || theme_classic_test).toBe(true);
});

/*
// Test child references
test('Test: child references', () => {
	expect(object.menu).toBeDefined();
	expect(object.searchArea).toBeDefined();
	expect(object.previewArea).toBeDefined();
});
*/