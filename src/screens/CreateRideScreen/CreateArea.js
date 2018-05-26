import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
		Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import DirectRideSwitch from '../../components/DirectRideSwitch';
import SeatPicker from '../../components/SeatPicker';
import DatePicker from '../../components/DatePicker';
import RidePrice from '../../components/RidePrice';
import CreateRideDescription from '../../components/CreateRideDescription';

export default class CreateArea extends Component {

	constructor(props) {
		super(props);
		this.pickupInput = "";
		this.dropoffInput = "";
		this.chosenDate = new Date();
		this.chosenSeats = 1;
		this.chosenDescription = "";
		this.chosenPrice = 0;
	}

	render() {

		const customStyle = {
			buttonContainer: [styles.buttonContainer, {
				backgroundColor: this.props.color_theme.APP_BACKGROUND,
				shadowColor: this.props.color_theme.APP_UNFOCUS
			}]
		};

		return (
			<ScrollView style={styles.container}>

				<SearchBox
					onChangeText={(searchInputs)=>{
						this.searchInputs = searchInputs;
					}}/>


				<View style={styles.seatPriceContainer}>
					<SeatPicker
						color_theme={this.props.color_theme}
						onSeatsChange={(seats) => {
							this.chosenSeats = seats;
						}}/>
					<RidePrice
						color_theme={this.props.color_theme}
						onPriceChange={(price) => {
							this.chosenPrice = parseFloat(price);
						}}
					/>
				</View>

				<CreateRideDescription
					color_theme={this.props.color_theme}
					onDescriptionChange={(description) => {
						this.chosenDescription = description;
					}}
				/>


				<DirectRideSwitch/>



				<DatePicker
					color_theme={this.props.color_theme}
					onDateChange={(date) => {
						this.chosenDate = date;
					}}/>



				<View style={customStyle.buttonContainer}>
					<Button
						onPress={() => {
							let inputs = {
								searchInputs: this.searchInputs,
								chosenDate: this.chosenDate,
								chosenSeats: this.chosenSeats,
								chosenDescription: this.chosenDescription,
								chosenPrice: this.chosenPrice
							}
							this.props.onSubmit(inputs);
						}}
						title="Create Ride!"/>
				</View>

			</ScrollView>

		);

	}
}


//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		top: 15
	},
	buttonContainer: {
		marginLeft:15,
		marginRight:10,
		marginBottom:0,
		backgroundColor: null,
		borderRadius: 10,
		padding: 10,
		shadowColor: null,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 0.25
	},
	seatPriceContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
