import{ AsyncStorage } from "react-native";
import { COLOR, STRING } from './Constants';

export function getTheme(callback) {
	AsyncStorage.getItem(STRING.THEME.KEY).then((value) => {
		if (value === STRING.THEME.DARK) {
			callback(COLOR.THEME_DARK);
		}
		else if (value === STRING.THEME.LIGHT) {
			callback(COLOR.THEME_LIGHT);
		}
		else {
			callback(COLOR.THEME_LIGHT);
		}
	});
}