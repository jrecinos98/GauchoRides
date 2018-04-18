function User (id, name, email, description, picture, rating, drive_rating, tags, rides, follows) {
	this.id = id; // long
	this.name = name; // string
	this.email = email; // string
	this.description = description; // string
	this.picture = picture; // url
	this.rating = rating; // float
	this.drive_rating = drive_rating; // float
	this.tags = tags; // list of string (maybe make a set of enums)
	this.rides = rides; // list of ride ids
	this.follows = follows; // list of user ids
}

