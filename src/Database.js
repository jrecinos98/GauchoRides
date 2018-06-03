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
		firestore.collection(FIREBASE.USERS_PATH).doc(id).get()
		.then(function(doc) {
			callback(doc.data());
		})
		.catch(function(error) {
			console.log("Error getting document:", error);
		});
	}


	static getUserList(id_list, callback) {
		if (id_list == undefined) {
			callback([]);
			return;
		}

		let userList = [];
		for (let i = 0; i < id_list.length; i++){
			let id = id_list[i];
			Database.getUser(id, (user) => {
				userList.push(user);
				callback(userList);
			});
		}
	}


    /**
	 * Retrieves rides that the user has taken a part in
     * @param callback
     */
	static getUserHistory(callback){
		if (User.currentUser.rides == undefined || Object.keys(User.currentUser.rides).length == 0) {
			callback([], []);
			return;
		}

		let futureRideList = [];
		let completedRideList = [];
		var d=new Date().getTime()/1000;
		for (var id in User.currentUser.rides){
		    Database.getRide(id, (ride) => {
		    	if(ride.time>=d){
		    		futureRideList.push(ride);
		    		callback(futureRideList, completedRideList);
		    	}
		    	else{
		    		completedRideList.push(ride);
		    		callback(futureRideList, completedRideList);

		    	}
				
			});
		}
	}






//rideList[i].origin.name

    /**
	 * Creates a ride on Firestore.
	 * @param path
     * @param ride
     * @param originCity
     * @param destinCity
     */
	static createRide(path, ride, originCity, destinCity) {
		firestore.collection(path).doc(originCity).collection(destinCity).add(ride.toObject()).then((ref) => {
			//Update ride information on firebase
			ride.id = originCity + '/' + destinCity + '/' + ref.id;
			Database.updateRide(path, ride);

			//Update driver information on firebase
			if(path === FIREBASE.RIDES_PATH) {
                User.currentUser.rides[ride.id] = 'driver';
            }
            else{
				User.currentUser.requests[ride.id]= "passenger";
			}
			Database.updateUser(User.currentUser);
		});
	}
/*
	static createRequest(ride, originCity, destinCity){
        firestore.collection(FIREBASE.REQUESTS_PATH).doc(originCity).collection(destinCity).add(ride.toObject()).then((ref) => {

            //Update ride information on firebase
            ride.id = ref.id;
            Database.updateRide(path, originCity, destinCity, ride);

            //Update driver information on firebase
            User.currentUser.rides[originCity + '/' + destinCity + '/' + ride.id] = 'passenger';
            Database.updateUser(User.currentUser);
        });
	}
	*/

    /**
	 * Updates a previously created ride.
	 * @param path
     * @param originCity
     * @param destinCity
     * @param ride
     */
	static updateRide(path, ride) {
		firestore.collection(path).doc(ride.id).set(ride.toObject())
	}

    /**
	 * Retrieves a previously created ride using the ID
     * @param id The id specifies the path of the ride.
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

	static getRequest(id, callback){
        firestore.collection(FIREBASE.REQUESTS_PATH).doc(id).get()
            .then(function(doc) {
                if (doc.exists) {
                    callback(doc.data());
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
    }


    static retrieveRideList(origin, destination, callBack){
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
