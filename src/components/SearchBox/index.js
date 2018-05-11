import React, { Component } from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';
import { Ionicons } from '@expo/vector-icons';
import styles from "./SearchBoxStyles.js";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class SearchBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			directRide: true,
			pickupInput: "",
			dropoffInput: ""
		};
	}

	render() {
		return (
			<View style={styles.container}>

				<GooglePlacesAutocomplete
					placeholder='Choose Pick-Up Location'
					minLength={2}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row => row.description}
					styles={styles.searchBox}
					currentLocation={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					getDefaultValue={() => ''}
					onPress={(data, details = null) => {
						this.setState({pickupInput: data.description});
						this.props.onChangeText(this.state);
					}}
					query={{
						key: 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw',
						language: 'en',
						types: 'geocode'
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
					placeholder='Choose Drop-Off Location'
					minLength={2}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='auto'
					fetchDetails={true}
					renderDescription={row => row.description}
					styles={styles.searchBox}
					currentLocation={false}
					nearbyPlacesAPI='GooglePlacesSearch'
					getDefaultValue={() => ''}
					onPress={(data, details = null) => {
						this.setState({dropoffInput: data.description});
						this.props.onChangeText(this.state);
					}}
					query={{
						key: 'AIzaSyCvi0ipnVAsDJU8A7Aizzwj9P3DHE1eTxw',
						language: 'en',
						types: 'geocode'
					}}
					GooglePlacesSearchQuery={{
						rankby: 'distance',
						keyword: 'address'
					}}
					renderLeftButton={() =>
						<Ionicons name="ios-search" size={15} color="#FF5E3A" style={styles.searchIcon}/>
					}
				/>

				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>Direct Rides Only</Text>
					<View style={styles.switchWrapper}>
						<Switch
							value={this.state.directRide}
							onValueChange={(val) => {this.setState({directRide: val})}}
							disabled={false}
							activeText={"ON"}
							inActiveText={"OFF"}
							backgroundActive={'green'}
							backgroundInactive={'gray'}
							changeValueImmediately={true}/>
					 </View>
				</View>

			</View>
		);
	}
};
