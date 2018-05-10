export default class Ride {
	id: 0;
	description: string;
	seats: 0;
	driver: 0;
	riders: {};
	time: 0;
	origin: Area;
	destination: Area;

	constructor (id, description, seats, driver, riders, time, origin, destination) {
		this.id = id;
		this.description = description;
		this.seats = seats;
		this.driver = driver;
		this.riders = riders;
		this.time = time;
		this.origin = origin;
		this.destination = destination;
	}

	toObject() {
		return {
			id: this.id,
			description: this.description,
			seats: this.seats,
			driver: this.driver,
			riders: this.riders,
			time: this.time,
			origin: this.origin.toObject(),
			destination: this.destination.toObject()
		};
	}
}
