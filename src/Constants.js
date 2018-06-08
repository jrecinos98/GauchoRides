
export const TRANSPORT_MODE = 'driving'; // 'walking';
export const GOOG_APIKEY = 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw';

/**
 * Wrapper class for our Constant values.
 */
export default class Constants {
    /**
     * String constants
     */
    static STRING = {
        THEME: {
            DARK: "Dark Theme",
            LIGHT: "Light Theme",
            CLASSIC: "Classic Theme"
        },
        KEY: {
            APP_THEME: "App Theme",
            MAP_THEME: "Map Theme"
        }
    };

    /**
     *  Dimension constants
     */
    static DIMENSION = {
        TOPBAR: {HEIGHT: 50},
        ICON: {
            SIZE: 32,
            ACTION_BUTTON: 52
        },
        TITLE: {SIZE: 20},
        PREVIEW: {
            WIDTH: 275,
            HEIGHT: 100,
            MARGIN: 5
        }
    };


    /**
     * Firebase constants
     * @type {{USERS_PATH: string, RIDES_PATH: string}}
     */
    static FIREBASE = {
        USERS_PATH: 'users',
        RIDES_PATH: 'rides',
        REQUESTS_PATH: 'requests'
    };

    /**
     * Color constants
     */
    static COLOR = {

        THEME_DARK: {
            APP_BACKGROUND: '#011a42',
            APP_BACKGROUND_PROFILE: '#485a7a',
            APP_FOCUS: '#6ec6ff',
            APP_UNFOCUS: '#3498db',
            APP_TITLE: '#3498db',
            APP_TITLE_LOGIN: '#FFD700',
            BUTTON: '#0d47a1',
            BUTTON_LOGIN: 'rgba(13,71,161, 0.9)',
            FB_NAME_COLOR: '#ffffff',

            BGCOLOR: 'skyblue'

        },

        THEME_LIGHT: {
            APP_BACKGROUND: '#ffffff',
            APP_BACKGROUND_PROFILE: '#ffffff',
            APP_FOCUS: '#000000',
            APP_UNFOCUS: '#c7c5c4',
            APP_TITLE: '#000000',
            APP_TITLE_LOGIN: '#000000',
            BUTTON: '#0d47a1',
            BUTTON_LOGIN: 'rgba(13,71,161, 0.7)',
            FB_NAME_COLOR: '#000000',
            BGCOLOR: 'skyblue'

        },

        THEME_CLASSIC: {
            APP_BACKGROUND: '#0f2236',
            APP_BACKGROUND_PROFILE: '#485a7a',
            APP_FOCUS: '#b3ad08',
            APP_UNFOCUS: '#c3e0c3',
            APP_TITLE: '#3498db',
            APP_TITLE_LOGIN: '#FFD700',
            BUTTON: '#0d47a1',
            BUTTON_LOGIN: 'rgba(13,71,161, 0.7)',
            FB_NAME_COLOR: '#b3ad08',
            BGCOLOR: '#b3ad08'

        }

    };
    /**
     *Constant colors for the rating components
     */
    static RATING_COLOR = {
        CHILI_COLOR: '#c21807',
        WHEEL_COLOR: '#000000',
        UNSELECTED: '#888888',

    };

    /**
     * Constant variables used to test project
     * @type {{TEST_EMAIL: string, TEST_PASSWORD: string}}
     */

    static TEST_CONSTANTS = {
        DATABASE: {
            TEST_EMAIL: 'mariocuellar.98@gmail.com',
            TEST_PASSWORD: 'ILoveUCSB'
        },
    };
}

