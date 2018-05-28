/**
 * An object used to represent a ride. It contains all the information about the ride, such as who the driver was, the date, the destination, date , time, etc..
 */
export default class Ride {
	id: 0;
	price: 0;
	description: string;
	seats: 0;
	driver: 0;
	passengers: [];
	time: 0;
	origin: Area;
	destination: Area;


	constructor (id, price, description, seats, driver, passengers, time, origin, destination) {
		this.id = id;
		this.price = price;
		this.description = description;
		this.seats = seats;
		this.driver = driver;
		this.passengers = passengers;
		this.time = time;
		this.origin = origin;
		this.destination = destination;
	}

	toObject() {
		return {
			id: this.id,
			price: this.price,
			description: this.description,
			seats: this.seats,
			driver: this.driver,
			passengers: this.passengers,
			time: this.time,
			price: this.price,
			origin: this.origin.toObject(),
			destination: this.destination.toObject()
		};
	}

}
