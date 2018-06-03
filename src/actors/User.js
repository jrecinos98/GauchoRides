/**
 * The User class contains all the information about the user (email, description, rating, image url, etc..). The information is retrieved from Firebase and a User object is initialized.
 */
export default class User {
	id: 0;
	fbID:0;
	name: string;
	email: string;
	description: string;
	sexy_rating: 0.0;
	drive_rating: 0.0;
	tags: {};
	rides: {};
	requests: {};
	follows: {};
	messages: {};

	//registers a user. Checks if the user signed in with fb or email and save the data accordingly.
	constructor (object, newUserFromFB) {
		if (newUserFromFB) {
			this.id = object.uid;
			this.fbID= object.providerData[0].uid;
			this.name = object.displayName;
			this.email = object.email;
			this.description = "";
			this.sexy_rating = 4.5;
			this.drive_rating = 4.5;
			this.tags = {};
			this.rides = {};
			this.requests= {};
			this.follows = {};
			this.messages={};
		}
		else {
			this.id = object.id;
			this.fbID= object.fbID;
			this.name = object.name;
			this.email = object.email;
			this.description = object.description;
			this.sexy_rating = object.sexy_rating;
			this.drive_rating = object.drive_rating;

			//Make more efficient by knowing the path beforehand
			this.tags = ('tags' in object) ? object.tags : {};
			this.rides = ('rides' in object) ? object.rides : {};
			this.requests=('requests' in object) ? object.requests : {};
			this.follows = ('follows' in object) ? object.follows : {};
			this.messages=('messages' in object) ? object.messages : {};
		}
	}

	toObject() {
		return {
			id: this.id,
			fbID: this.fbID,
			name: this.name,
			email: this.email,
			description: this.description,
			sexy_rating: this.sexy_rating,
			drive_rating: this.drive_rating,
			tags: this.tags,
			rides: this.rides,
			requests: this.requests,
			follows: this.follows,
			messages: this.messages

		};
	}
}


User.currentUser = null;
User.newUserFromFB = true;