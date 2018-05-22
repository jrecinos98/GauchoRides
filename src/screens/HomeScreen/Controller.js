

export default class Controller {
	static refs = {};

	static home = 'home';
	static map = 'map';
	static preview = 'preview';
	static search = 'search';
	static menu = 'menu';
	static actionbutton = 'actionbutton';

	static displaySearch = true;

	static setRef(ref, type) {
		this.refs[type] = ref;
	}

	static toggleDisplay() {
		this.displaySearch = !this.displaySearch;

		this.refs.search.show(this.displaySearch);
		this.refs.preview.show(!this.displaySearch);
		this.refs.actionbutton.show(this.displaySearch);
	}

	static drawMapRoute(origin, destin) {
		this.refs.map.createRoute(origin.toString(), destin.toString());
	}

	static focusRide(index) {
		if (this.refs.preview.previewBar === undefined)
		    this.refs.preview.show(!this.displaySearch);

		this.refs.preview.previewBar.scrollTo({
		    x: this.refs.preview.getSnapPosition(index),
		    y: 0,
		    animated: true
		});
		this.refs.map.rideMap.moveMapCamera(index);
	}

	static showMenu(toShow) {
		if (toShow)
			this.refs.menu.show();
		else
			this.refs.menu.hide();
	}
}
