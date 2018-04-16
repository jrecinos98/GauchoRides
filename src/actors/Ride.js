function Ride (id, title, description, requirement, driver, riders, time, route) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.requirement = requirement; // list of tags
	this.driver = driver; // id
	this.riders = riders; // list of ids
	this.time = time;
	this.route = route;
}
