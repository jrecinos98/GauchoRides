import React, { Component } from "react";
import { View, InputGroup, Input } from "native-base";
import styles from "./SearchBoxStyles.js";
import PlacesAutocomplete from '../PlacesAutocomplete'
/**
 * Component containing the components needed to create a search query. Two GooglePlacesAutoComplete components are used to complete user origin and destination.
 */
export default class SearchBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			directRide: true,
			pickupInput: "",
			pickupArray: {},
			pickupCoords: {},
			dropoffInput: "",
			dropoffArray: {},
			dropoffCoords: {},
			pickupStaticMap: "",
			dropoffStaticMap: ""

			
		};
	}
	onPickupPress(pickupInput){
		this.setState(
		{
			pickupInput: pickupInput.input,
			pickupArray: pickupInput.inputArray,
			pickupCoords: pickupInput.coords,
			pickupStaticMap: pickupInput.staticMap

		});
		this.props.onChangeText(this.state);
	}
	onDropoffPress(dropoffInput){
		this.setState(
		{
			dropoffInput: dropoffInput.input,
			dropoffArray: dropoffInput.inputArray,
			dropoffCoords: dropoffInput.coords,
			dropoffStaticMap: dropoffInput.staticMap

		});
		this.props.onChangeText(this.state);
	}

	render() {
		return (
			<View style={styles.container}>

				<PlacesAutocomplete tag= {this.props.originTag} onPress={ (input) => {
					this.onPickupPress(input);
				}}/>
				<PlacesAutocomplete tag={this.props.destinationTag} onPress={ (input) => {
					this.onDropoffPress(input);
				}}/>

			</View>
		);
	}
};
