import{ AsyncStorage } from "react-native";
import { COLOR, STRING } from './Constants';
import {GOOG_APIKEY} from './Constants'
import {TRANSPORT_MODE} from './Constants'

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

export function extractCity(searchArray){
	var text= "";
	//console.log(searchArray)
	if (searchArray === undefined){
		return text
	}

	//If no ZIP code was input
	if (isNaN(searchArray[searchArray.length-2].value)){
		text= searchArray[searchArray.length-3].value.toString()+", "+searchArray[searchArray.length-2].value.toString()
	}
	//If the array contains a zip code.
	else{
		text= searchArray[searchArray.length-4].value.toString()+", "+searchArray[searchArray.length-3].value.toString()
	}
	return text;	
}

export function getOriginLatLon(ride){
    return ride.origin.latitude.toString()+","+ride.origin.longitude.toString()
}
export function getDestLatLon(ride){
    return ride.destination.latitude.toString()+","+ride.destination.longitude.toString()
}

export function createRoute(origin, destin, callback) {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destin}&key=${GOOG_APIKEY}&mode=${TRANSPORT_MODE}`)
        .then(response => response.json())
        .then(async responseJson => {
            if (responseJson.routes.length) {
                let coords = this.decode(responseJson.routes[0].overview_polyline.points);           
                // this.rideMap.moveMapCamera(lastIndex);
                callback(coords_list);
            }

        })
        .catch(e => {console.warn(e)});
    }