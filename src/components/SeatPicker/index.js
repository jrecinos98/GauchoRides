import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";


/**
 * Returns the action button component displayed in the home screen.
 */
export default class SeatPicker extends Component{

	constructor(props) {
		super(props);
		this.state = {
			seats: 1
		};
	}

	increment() {
		this.setState((prev) => {
			return { seats: prev.seats + 1 };
		});
	}

	decrement() {
		if (this.state.seats > 1) {
			this.setState((prev) => {
				return { seats: prev.seats - 1 };
			});
		}
	}

	render(){
		this.props.onSeatsChange(this.state.seats);

		const customStyle = {
			button: [styles.button, {
				backgroundColor: this.props.color_theme.APP_BACKGROUND
			}],
			text: [styles.text, {
				color: this.props.color_theme.APP_FOCUS
			}]
		};

		return (
			<View style={styles.secondInputWrapper}>
				<Text style={styles.label}>Seats</Text>
				<View style={styles.container}>
					<TouchableOpacity
						style={customStyle.button}
						onPress={() => this.decrement()}>
						<Text style={customStyle.text}> - </Text>
					</TouchableOpacity>

					<Text style={styles.seatText}> {this.state.seats} </Text>

					<TouchableOpacity
						style={customStyle.button}
						onPress={() => this.increment()}>
						<Text style={customStyle.text}> + </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 10,
	},
	secondInputWrapper:{
		flex: 1,
		marginLeft:15,
		marginRight:10,
		marginTop:0,
		marginBottom:5,
		backgroundColor:"#fff",
		opacity:0.7,
		borderRadius:7,
	},
	label:{
		fontSize:10,
		fontStyle: "italic",
		marginLeft:10,
		marginTop:10,
		marginBottom: 0
	},
	button: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 5
	},
	text: {
		color: null
	},
	seatText: {
		marginLeft: 5,
		marginRight: 5
	}
}
