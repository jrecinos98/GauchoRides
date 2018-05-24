import{ AsyncStorage } from "react-native";
import { COLOR, STRING } from './Constants';

/*
 * Retrieves the previously selected theme from local storage.
 * @param callback
 */
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

/*
 * Retrieves the previously selected map theme from local storage
 * @param callback
 */
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


export function extractCity(text) {
    if (text === "")
        return "";
    text = text.replace(", USA", "");
    let address_list = text.split(',');
    return address_list[address_list.length - 2].trim() + "," + address_list[address_list.length - 1].trim();
}

export function getOriginLatLon(ride){
    return ride.origin.latitude.toString()+","+ride.origin.longitude.toString()
}
export function getDestLatLon(ride){
    return ride.destination.latitude.toString()+","+ride.destination.longitude.toString()
}
