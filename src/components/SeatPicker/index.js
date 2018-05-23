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
		const customStyle = {
            button: [styles.button, {
                backgroundColor: this.props.color_theme.APP_BACKGROUND
            }],
            text: [styles.text, {
            	color: this.props.color_theme.APP_FOCUS
            }]
        };

		return (
			<View style={styles.container}>
				<Text> Seats: </Text>

				<TouchableOpacity
					style={customStyle.button}
					onPress={() => this.decrement()}>
					<Text style={customStyle.text}> - </Text>
				</TouchableOpacity>

				<Text> {this.state.seats} </Text>

				<TouchableOpacity
					style={customStyle.button}
					onPress={() => this.increment()}>
					<Text style={customStyle.text}> + </Text>
				</TouchableOpacity>
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
        marginLeft:15,
        marginRight:10,
    },
    button: {
    	width: 30,
    	height: 30,
    	alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: null,
        borderRadius: 5,
        margin: 10
    },
    text: {
    	color: null
    }
}