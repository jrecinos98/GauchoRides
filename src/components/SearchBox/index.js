import React, { Component } from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import styles from "./SearchBoxStyles.js";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOG_APIKEY} from '../../Constants'
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
			dropoffLatLon: {},
			static_map: ""

			
		};
	}

	render() {
		return (
			<View style={styles.container}>

				<GooglePlacesAutocomplete
				//  predefinedPlaces={[homePlace, workPlace]}
					placeholder={this.props.originTag}
					minLength={4}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row => row.description}
					styles={styles.searchBox}
					currentLocation={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					getDefaultValue={() => ''}
					onPress={(data, details) => {
						this.setState(
							{
								pickupInput: data.description,
								pickupArray: data.terms,
								pickupCoords: details.geometry.location,
								static_map: details.icon
						});
						this.props.onChangeText(this.state);
					}}
					query={{
						key: GOOG_APIKEY,//'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw',
						language: 'en',
						types: 'geocode',
						components: 'country:us|country:mx|country:ca|country:sv|country:gt',
						radius: "2000"
					}}
					GooglePlacesSearchQuery={{
						rankby: 'distance',
						keyword: 'address'
					}}
					renderLeftButton={() =>
						<Ionicons name="ios-search" size={15} color="#FF5E3A" style={styles.searchIcon}/>
					}
				/>

				<GooglePlacesAutocomplete
				 	//predefinedPlaces={[homePlace, workPlace]}
					placeholder={this.props.destinationTag}
					minLength={4}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row => row.description}
					styles={styles.searchBox}
					currentLocation={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					getDefaultValue={() => ''}
					onPress={(data, details=null) => {
						this.setState(
							{
								dropoffInput: data.description,
								dropoffArray: data.terms,
								dropoffLatLon: details.geometry.location,
								static_map: details.icon
							});
						this.props.onChangeText(this.state);
					}}
					query={{
						key: GOOG_APIKEY,//'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw',
						language: 'en',
						types: 'geocode',
						components: 'country:us|country:mx|country:ca|country:sv|country:gt',
						radius: "2000"
					}}
					GooglePlacesSearchQuery={{
						rankby: 'distance',
						keyword: 'address'
					}}
					renderLeftButton={() =>
						<Ionicons name="ios-search" size={15} color="#FF5E3A" style={styles.searchIcon}/>
					}
				/>

			</View>
		);
	}
};
