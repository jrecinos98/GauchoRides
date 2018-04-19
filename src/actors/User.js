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

	constructor (fbUser) {
		this.id = fbUser.uid;
		this.name = fbUser.displayName;
		this.email = fbUser.email;
		this.description = "";
		this.photo = fbUser.photoURL;
		this.rating = 0.0;
		this.drive_rating = 0.0;
		this.tags = {};
		this.rides = {};
		this.follows = {};
	}
}