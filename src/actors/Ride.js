export default class Ride {
	id: 0;
	title: string;
	description: string;
	seats: 0;
	driver: 0;
	riders: {};
	time: 0;
	origin: Area;
	destination: Area;

	constructor (id, title, description, seats, driver, riders, time, origin, destination) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.seats = seats;
		this.driver = driver;
		this.riders = riders;
		this.time = time;
		this.origin = origin;
		this.destination = destination;
	}
}
