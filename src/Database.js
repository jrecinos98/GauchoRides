import{ AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import { FIREBASE } from './Constants';
import User from './actors/User';
import Ride from './actors/User';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcNzQOQ33CCO3dDEDfoKWweeWVfsZ8uWo",
    authDomain: "ucsb-rideshare-app.firebaseapp.com",
    databaseURL: "https://ucsb-rideshare-app.firebaseio.com",
    projectId: "ucsb-rideshare-app",
    storageBucket: "ucsb-rideshare-app.appspot.com",
};

export default class Database {

	static initialize() {
		if (!firebase.apps.length) {
		    firebase.initializeApp(firebaseConfig);
		}
	}

	static onAuthChanged(callback) {
		firebase.auth().onAuthStateChanged((user) => {
			callback(user);
		});
	}

	static signupWithEmail(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(fbUser){
		    alert("Account created.");
		})
		.catch(function(error) {
		    alert("Account already existed.")
		});
	}

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

		/*
			fetch("https://graph.facebook.com/me?fields=id&access_token="+token, {
			    method: 'GET'
			})
		*/
	}

	static async logout() {
		await firebase.auth().signOut();
	}

	static createUser(user) {
		firebase.database().ref(FIREBASE.USERS_PATH + '/' + user.id).set(user);
	}

	static updateUser(user) {
		firebase.database().ref(FIREBASE.USERS_PATH + '/' + user.id).set(user);
	}

	static getUser(id, callback) {
		firebase.database().ref(FIREBASE.USERS_PATH + '/' + id).once('value').then(snapshot => {
			callback(snapshot.val());
		});
	}

	static createRide(ride) {
		let newRide = firebase.database().ref(FIREBASE.RIDES_PATH + '/').push(ride);

		//Update ride information on firebase
		ride.id = newRide.key;
		Database.updateRide(ride);

		//Update driver information on firebase
		User.currentUser.rides[newRide.key] = 'driver';
		Database.updateUser(User.currentUser);
	}

	static updateRide(ride) {
		firebase.database().ref(FIREBASE.RIDES_PATH + '/' + ride.id).set(ride);
	}

	static getRide(id, callback) {
		firebase.database().ref(FIREBASE.RIDES_PATH + '/' + id).once('value').then(snapshot => {
			callback(snapshot.val());
		});
	}

}
