import{ AsyncStorage } from "react-native";
import { COLOR, STRING } from './Constants';

//Get theme for app
export function getTheme(callback) {

	try {
		AsyncStorage.getItem(STRING.KEY.APP_THEME).then((APP_THEME) => {

			if (APP_THEME === STRING.THEME.DARK)
				callback(COLOR.THEME_DARK);

			else if (APP_THEME === STRING.THEME.LIGHT)
				callback(COLOR.THEME_LIGHT);

			else
				callback(COLOR.THEME_CLASSIC);
		});
	}
	catch (error) {
		console.log(error);
	}
}

//Get theme for map
export function getMapTheme(callback) {

	try {
		AsyncStorage.getItem(STRING.KEY.MAP_THEME).then((MAP_THEME) => {
			callback(MAP_THEME);
		});
	}
	catch (error) {
		console.log(error);
	}
}
