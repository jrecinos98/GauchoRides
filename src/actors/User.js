export default class User {
	id: 0;
	name: string;
	email: string;
	description: string;
	photo: string;
	rating: 0.0;
	drive_rating: 0.0;
	tags: {};
	rides: {};
	follows: {};

	constructor (object, isFB) {
		if (isFB) {
			this.id = object.uid;
			this.name = object.displayName;
			this.email = object.email;
			this.description = "";
			this.photo = object.photoURL;
			this.rating = 0.0;
			this.drive_rating = 0.0;
			this.tags = {};
			this.rides = {};
			this.follows = {};
		}
		else {
			this.id = object.id;
			this.name = object.name;
			this.email = object.email;
			this.description = object.description;
			this.photo = object.photo;
			this.rating = object.rating;
			this.drive_rating = object.drive_rating;
			this.tags = ('tags' in object) ? object.tags : {};
			this.rides = ('rides' in object) ? object.rides : {};
			this.follows = ('follows' in object) ? object.follows : {};
		}
	}
}

User.currentUser = null;
User.isFB = true;