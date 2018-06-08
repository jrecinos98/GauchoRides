/**
 * Represents a geological area with latitude and longitude
 */
export default class Area {
	latitude: 0.0;
	longitude: 0.0;
	radius: 0.0;
	name: String;

	constructor (object) {
		this.latitude = object.latitude;
		this.longitude = object.longitude;
		this.radius = object.radius;
		this.name = object.name;
	}

	toObject() {
		return {
			latitude: this.latitude,
			longitude: this.longitude,
			radius: this.radius,
			name: this.name
		};
	}
}
