import{ AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE } from './Constants';
import {TEST_CONSTANTS} from "./Constants";
import User from './actors/User';
import Ride from './actors/User';

var firestore = null;

/*
 * Firebase configuration for our project
 */
const firebaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

/**
 * A wrapper class for all the Firebase methods we use.
 */
export default class Database {

    /**
	 * Initialize Firestore.
     */
	static initialize() {
		if (!firebase.apps.length) {
		    firebase.initializeApp(firebaseConfig);
		    firestore = firebase.firestore();

		    try {
				firestore.settings({timestampsInSnapshots: true});
			}
			catch(err) {
				firestore.settings({});
			}
		}
	}
	//timestampsInSnapshots: true
    /**
	 * On authentication pass the User info to callback method
     * @param callback
     */
	static onAuthChanged(callback) {
		firebase.auth().onAuthStateChanged((user) => {
			callback(user);
		});
	}

    /**
	 * Signs up an user on firebase and authenticates the user
     * @param email The user email
     * @param password The user password
     */
	static signupWithEmail(email, password) {
        var created = false;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (fbUser) {
                created = true;
                alert("Account created.");
            })
            .catch(function (error) {
                alert("Account already existed.");
            });
        return created;

    }

    /**
	 * Signs in an already registere user using email and password
     * @param email
     * @param password
     */
	static loginWithEmail(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function (user) {
		    console.log(user);
		    alert("Login successful.")
		})
		.catch(function(error) {
		    alert("An error occurred please try again. Make sure you use a verified email and password.")
		})
	}

    /**
	 * Authenticates the user by using the Facebook API
     * @returns {Promise<void>}
     */
	static async loginWithFacebook() {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
		('615345508804840', {
		    permissions: ['public_profile', 'email'],
		});

		if (type === 'success') {
		    const credential = firebase.auth.FacebookAuthProvider.credential(token);
		    firebase.auth().signInWithCredential(credential).catch((error) => {
		        alert(error);
		    });
		}
	}

    /**
	 * Logs out a user. Forces user to log in again.
     * @returns {Promise<void>}
     */
	static async logout() {
		await firebase.auth().signOut();
	}

    /**
	 * Creates user on Firebase.
     * @param user
     */
	static createUser(user) {
		firestore.collection(FIREBASE.USERS_PATH).doc(user.id).set(user.toObject()).then((ref) => {
			//console.log(ref);
		});
	}

    /**
	 * Updates a user information on firebase
     * @param user
     */
	static updateUser(user) {
		firestore.collection(FIREBASE.USERS_PATH).doc(user.id).set(user.toObject()).then((status) => {
			//console.log(status);
		});
	}

    /**
	 * Retrieves a User from Firebase
     * @param id
     * @param callback
     */
	static getUser(id, callback) {
		firestore.collection(FIREBASE.USERS_PATH ).doc(id).get()
		.then(function(doc) {
			callback(doc.data());
		})
		.catch(function(error) {
		    console.log("Error getting document:", error);
		});
	}

    /**
	 * Retrieves rides that the user has taken a part in
     * @param callback
     */
	static getUserHistory(callback){
		var rideList = new Array();
		for (var id in User.currentUser.rides){
		    Database.getRide(id, (ride) => {
				rideList.push(ride);
                callback(rideList);
			});
		}

	}
//rideList[i].origin.name

    /**
	 * Creates a ride on Firestore.
     * @param ride
     * @param originCity
     * @param destinCity
     */
	static createRide(ride, originCity, destinCity) {

		// "6586 Picasso Rd, Isla Vista, CA 93117"
		// const originCity = "Isla Vista, CA";
		// const destinCity = "Los Angeles, CA";
		// const originCityLoc = {latitude: 34.413329, longitude: -119.860972};
		// const destinCityLoc = {latitude: 34.052234, longitude: -118.243685};
		// firestore.collection(FIREBASE.RIDES_PATH).doc(originCity).set({"Location": originCityLoc});
		// firestore.collection(FIREBASE.RIDES_PATH).doc(originCity).collection(destinCity).doc("Location").set(destinCityLoc);

		firestore.collection(FIREBASE.RIDES_PATH).doc(originCity).collection(destinCity).add(ride.toObject()).then((ref) => {

			//Update ride information on firebase
			ride.id = ref.id;
			Database.updateRide(originCity, destinCity, ride);

			//Update driver information on firebase
			User.currentUser.rides[originCity + '/' + destinCity + '/' + ride.id] = 'driver';
			Database.updateUser(User.currentUser);
		});
	}

    /**
	 * Updates a previously created ride.
     * @param originCity
     * @param destinCity
     * @param ride
     */
	static updateRide(originCity, destinCity, ride) {
		firestore.collection(FIREBASE.RIDES_PATH).doc(originCity).collection(destinCity).doc(ride.id).set(ride.toObject()).then((ref) => {
		});
	}

    /**
	 * Retrieves a previously created ride using the ID
     * @param id
     * @param callback
     */
	static getRide(id, callback) {
		firestore.collection(FIREBASE.RIDES_PATH).doc(id).get()
		.then(function(doc) {
		    if (doc.exists) {
				callback(doc.data());
		    }
		})
		.catch(function(error) {
		    console.log("Error getting document:", error);
		});
	}
    static getRides(origin, destination, callBack){
        var ride = firestore.collection(FIREBASE.RIDES_PATH).doc(origin).collection(destination);
        let rideList=[];
        ride.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    rideList.push(doc.data());
                   // console.log(doc.data())
                });
                callBack(rideList);
            })
            .catch(err => {
                console.log("Error getting documents", err)
            });
    }


}
