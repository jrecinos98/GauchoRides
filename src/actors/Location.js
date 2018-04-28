export default class Location {
	latitude: 0.0;
	longitude: 0.0;

	constructor (latitude, longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	toString () {
		return this.latitude + "," + this.longitude;
	}
}
