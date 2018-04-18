function Ride (id, title, description, driver, riders, time, origin, destination) {
	this.id = id; //long
	this.title = title; //string
	this.description = description; //string
	this.driver = driver; // id (long)
	this.riders = riders; // list of ids (long)
	this.time = time; // epoch (long)
	this.origin = origin; // Area type
	this.destination = destination; // Area type
}

function Area(location, radius) {
	this.location = location; // Location type
	this.radius = radius; // in miles (float)
}

function Location(latitude, longtitude) {
	this.latitude = latitude; // float
	this.longtitude = longtitude; // float
}
