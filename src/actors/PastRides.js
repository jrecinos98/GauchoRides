/**
 * An object that contains the information of a past ride.
 */
export default class PastRides {
	id: 0;
	description: string;
	seats: 0;
	driver: 0;
	riders: {};
	time: 0;
	origin: Area;
	destination: Area;
	photo: string;
	constructor (id, description, seats, driver, riders, time, origin, destination, photo) {
		this.id = id;
		this.description = description;
		this.seats = seats;
		this.driver = driver;
		this.riders = riders;
		this.time = time;
		this.origin = origin;
		this.destination = destination;
		this.photo = photo;
	}
}
