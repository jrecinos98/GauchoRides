import{ AsyncStorage } from "react-native";
import { COLOR, STRING } from './Constants';
import {GOOG_APIKEY} from './Constants'
import {TRANSPORT_MODE} from './Constants'
import User from "./actors/User";
import Ride from "./actors/Ride";
import Area from "./actors/Area";
import Database from "./Database";


export default class Utility {

    /*
     * Retrieves the previously selected theme from local storage.
     * @param callback
     */
    static getTheme(callback) {

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
    static getMapTheme(callback) {

    	try {
    		AsyncStorage.getItem(STRING.KEY.MAP_THEME).then((MAP_THEME) => {
    			callback(MAP_THEME);
    		});
    	}
    	catch (error) {
    		console.log(error);
    	}
    }

    static extractCity(searchArray){
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

    static getOriginLatLon(ride) {
        return ride.origin.latitude.toString() + "," + ride.origin.longitude.toString()
    }

    static getDestLatLon(ride) {
        return ride.destination.latitude.toString() + "," + ride.destination.longitude.toString()
    }

    static createRide(path, searchInputs, chosenDate, chosenSeats, description, price, callback){
        if (searchInputs === undefined || searchInputs.pickupInput === ""|| searchInputs.dropoffInput === ""|| chosenDate==="") {
            callback(false);
            return;
        }
        if (searchInputs.pickupArray.length < 3){
            alert("Please be more specific on your starting location.");
            callback(false);
            return;
        }
        if (searchInputs.dropoffArray.length < 3){
            alert("Please be more specific on your destination.");
            callback(false);
            return;
        }
        if(isNaN(price)){
            alert("please enter a valid price");
            callback(false);
            return;
        }
        let ride = new Ride({
            id: 0,
            price: price,
            description: description,
            seats: chosenSeats,
            driver: User.currentUser.id,
            passengers: [],
            time: Math.floor(chosenDate / 1000),
            origin: new Area({
                latitude: searchInputs.pickupCoords.lat,
                longitude: searchInputs.pickupCoords.lng,
                radius: 5,
                name: searchInputs.pickupInput
            }),
            destination: new Area({
                latitude: searchInputs.dropoffCoords.lat,
                longitude: searchInputs.dropoffCoords.lng,
                radius: 5,
                name: searchInputs.dropoffInput
            })
        });
        let pickupCity = this.extractCity(searchInputs.pickupArray);
        let dropoffCity = this.extractCity(searchInputs.dropoffArray);
        Database.createRide(path,ride, pickupCity, dropoffCity);
        callback(true);
    }

    static createRoute(origin, destin, callback) {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destin}&key=${GOOG_APIKEY}&mode=${TRANSPORT_MODE}`)
            .then(response => response.json())
            .then(async responseJson => {
                let coords = this.decode(responseJson.routes[0].overview_polyline.points);
                callback(coords);
            })
            .catch(e => {
                console.warn(e)
            });
    }

    //Transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
    static decode(t, e) {
        for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
            a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);
            o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])
        }
        return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
    }

    static formatDate(date) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let prefixH = "";
        let prefixM = "";
        let ampm = "AM";

        if (hour > 12) {
            hour -= 12;
            ampm = "PM";
        }

        if (hour == 0) {
            hour = 12;
            ampm = "AM";
        }

        if (hour < 10)
            prefixH = "0";

        if (minute < 10)
            prefixM = "0";

        return month + ' ' + day + ', ' + prefixH + hour + ':' + prefixM + minute + ' ' + ampm;
    }

}