export default class Area {
	latitude: 0.0;
	longitude: 0.0;
	radius: 0.0;
	name: String;

	constructor (latitude, longitude, radius, name) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.radius = radius;
		this.name = name;
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
