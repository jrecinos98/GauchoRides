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
	follows: {};
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
			this.follows = {};
		}
		else {
			this.id = object.id;
			this.fbID= object.fbID;
			this.name = object.name;
			this.email = object.email;
			this.description = object.description;
			this.sexy_rating = object.sexy_rating;
			this.drive_rating = object.drive_rating;
			this.tags = ('tags' in object) ? object.tags : {};
			this.rides = ('rides' in object) ? object.rides : {};
			this.follows = ('follows' in object) ? object.follows : {};
		}
	}
}


User.currentUser = null;
User.newUserFromFB = true;