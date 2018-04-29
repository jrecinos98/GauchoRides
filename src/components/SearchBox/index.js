import React, { Component } from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import { Switch } from 'react-native-switch';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentLocation, getInputData, toggleSearchResultModal, getAddressPredictions } from "../../../modules/home";
import styles from "./SearchBoxStyles.js";


export default class SearchBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			directRide: true,
			pickupInput: "",
			dropoffInput: ""
		};
	}

	handleInput(key, val) {
		getInputData({
			key,
			value:val
		});
		console.log(getAddressPredictions());
	}

	render() {
		return (
			<View style={styles.searchBox}>

				<View style={styles.inputWrapper}>
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input
							onFocus={()=>toggleSearchResultModal("pickUp")}
							style={styles.inputSearch}
							placeholder="Choose pick-up location"
							onChangeText={(pickupInput) => {
								this.handleInput.bind(this, "pickUp");
								this.setState({pickupInput: pickupInput});
								this.props.onChangeText(pickupInput, this.state.dropoffInput);
							}}/>
					</InputGroup>
				</View>


				<View style={styles.secondInputWrapper}>
					<InputGroup>
						<Ionicons name="ios-search" size={15} color="#FF5E3A"/>
						<Input
							onFocus={()=>toggleSearchResultModal("dropoff")} 
							style={styles.inputSearch}
							placeholder="Choose drop-off location"
							onChangeText={(dropoffInput) => {
								this.handleInput.bind(this, "dropoff")
								this.setState({dropoffInput: dropoffInput});
								this.props.onChangeText(this.state.pickupInput, dropoffInput);
							}}/>
					</InputGroup>
				</View>

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
