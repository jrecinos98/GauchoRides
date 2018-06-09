import React from 'react';
import renderer from 'react-test-renderer';
import Database from '../../src/Database';
import 'firebase/firestore';
import Constants from "../../src/Constants";
import Utility from "../../src/Utility"


// Test extractCity function
test('Test: extractCity(text)', () => {
    const IV = [
        {
            value: "1500 Sabado Tarde Road"
        },
        {
            value: "Isla Vista"
        },
        {
            value: "CA"
        },
        {
            value: "USA"
        }
    ];
    const AUSTIN = [
        {
            value: "Austin"
        },
        {
            value: "TX"
        },
        {
            value: "USA"
        }
    ];
    const LA = [
        {
            value: "Los Angeles"
        },
        {
            value: "CA"
        },
        {
            value: "USA"
        }
    ];
    const CA = [
        {
            value: "CA"
        },
        {
            value: "USA"
        }

    ];
    expect(Utility.extractCity(IV)).toBe('Isla Vista, CA');
    expect(Utility.extractCity(AUSTIN)).toBe('Austin, TX');
    expect(Utility.extractCity(LA)).toBe('Los Angeles, CA');
    expect(Utility.extractCity(CA)).toBe('');
    expect(Utility.extractCity([{value: "CA"}])).toBe('');
});

test('Test: formatDate(date)', () => {
    const CHRISTMAS= new Date(1545696000000);
    const NEW_YEARS= new Date(1546214400000)
    expect(Utility.formatDate(CHRISTMAS)).toBe('Dec 24, 04:00 PM');
    expect(Utility.formatDate(NEW_YEARS)).toBe('Dec 30, 04:00 PM');
});

