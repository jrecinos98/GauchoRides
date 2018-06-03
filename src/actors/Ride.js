import Area from './Area';

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


	constructor (object) {
		this.id = object.id;
		this.price = object.price;
		this.description = object.description;
		this.seats = object.seats;
		this.driver = object.driver;
		this.passengers = object.passengers;
		this.time = object.time;
		this.origin = new Area(object.origin);
		this.destination = new Area(object.destination);
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
