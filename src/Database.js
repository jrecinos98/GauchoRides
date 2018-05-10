import{ AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE } from './Constants';
import User from './actors/User';
import Ride from './actors/User';

var firestore = null;

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
		    firestore = firebase.firestore();
		    firestore.settings({timestampsInSnapshots: true});
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
	}

	static async logout() {
		await firebase.auth().signOut();
	}

	static createUser(user) {
		firestore.collection(FIREBASE.USERS_PATH).doc(user.id).set(user.toObject()).then((ref) => {
			console.log(ref);
		});
	}

	static updateUser(user) {
		firestore.collection(FIREBASE.USERS_PATH).doc(user.id).set(user.toObject()).then((status) => {
			console.log(status);
		});
	}

	static getUser(id, callback) {
		firestore.collection(FIREBASE.USERS_PATH ).doc(id).get()
		.then(function(doc) {
		    if (doc.exists) {
				callback(doc.data());
		    }
		})
		.catch(function(error) {
		    console.log("Error getting document:", error);
		});
	}

	static createRide(ride) {
		firestore.collection(FIREBASE.RIDES_PATH).add(ride.toObject()).then((ref) => {
			//Update ride information on firebase
			ride.id = ref.id;
			Database.updateRide(ride);

			//Update driver information on firebase
			User.currentUser.rides[ride.id] = 'driver';
			Database.updateUser(User.currentUser);
		});
	}

	static updateRide(ride) {
		firestore.collection(FIREBASE.RIDES_PATH).doc(ride.id).set(ride.toObject()).then((ref) => {
			console.log("Ride updated!");
		});
	}

	static getRide(id, callback) {
		firestore.collection(FIREBASE.RIDES_PATH ).doc(id).get()
		.then(function(doc) {
		    if (doc.exists) {
				callback(doc.data());
		    }
		})
		.catch(function(error) {
		    console.log("Error getting document:", error);
		});
	}

}
