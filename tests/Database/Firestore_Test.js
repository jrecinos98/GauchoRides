import React from 'react';
import renderer from 'react-test-renderer';
import Database from '../../src/Database';

import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from "../../src/Constants";
import User from "../../src/actors/User";

var object;

test('Test: Database.initialize()', () => {
    Database.initialize();
    expect(firebase.apps.length !== 0).toBe(true)

});

test('Test: Database.signupWithEmail(email, password)', async () => {
	expect(await Database.signupWithEmail(
		Constants.TEST_CONSTANTS.DATABASE.TEST_EMAIL,
		Constants.TEST_CONSTANTS.DATABASE.TEST_PASSWORD))
	.toBe(false);
});

test('Test: Database.loginWithEmail(email, password)', async () => {
	expect(await Database.loginWithEmail(
		Constants.TEST_CONSTANTS.DATABASE.TEST_EMAIL,
		Constants.TEST_CONSTANTS.DATABASE.TEST_PASSWORD))
	.toBe(true);
});

test('Test: Database.createUser(user)', async () => {
	expect(await Database.createUser(new User({
			id: '123',
			fbID: '123',
			name: 'tester',
			email: '123',
			description: '123',
			sexy_rating: 0,
			drive_rating: 0,
			tags: {},
			rides: {},
			requests: {},
			follows: {},
			messages: {}

		}, false)))
	.toBe(true);
});

test('Test: Database.removeUser(user)', async () => {
	expect(await Database.removeUser('123'))
	.toBe(true);
});
