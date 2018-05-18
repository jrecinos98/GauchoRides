import React from 'react';
import renderer from 'react-test-renderer';
import Database from '../../src/Database';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE } from '../../src/Constants';
import {TEST_CONSTANTS} from "../../src/Constants";

var object;

test('Test: Database.initialize()', () => {
    Database.initialize();
    expect(firebase.apps.length !== 0).toBe(true)

});

test('Test: Database.signupWithEmail(email, password)', () => {
   Database.initialize();
   console.log(TEST_CONSTANTS.DATABASE.TEST_EMAIL);
   expect(Database.signupWithEmail(TEST_CONSTANTS.DATABASE.TEST_EMAIL, TEST_CONSTANTS.DATABASE.TEST_PASSWORD)).toBe(false)
});