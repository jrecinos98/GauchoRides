import React, { Component } from "react";
import { Text,TextInput } from "react-native";
import { View, InputGroup, Input } from "native-base";



export default class CreateRideDescription extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	render() {
		return (
			<View style={styles.secondInputWrapper}>
				<Text style={styles.label}>Extra Details</Text>
				<View style={styles.switchWrapper}>
					<TextInput
						style={styles.descriptionInput}
						onChangeText={(text) => this.setState({text})}
						value={this.state.text}
						maxLength={200}
						multiline={true}
						placeholder="Additional ride descriptions..."
					/>

				 </View>
			</View>
		);
	}
}

const styles = {
	secondInputWrapper:{
		marginLeft:15,
		marginRight:10,
		marginTop:0,
		marginBottom:5,
		backgroundColor:"#fff",
		opacity:0.7,
		borderRadius:7
	},
	label:{
		fontSize:10,
		fontStyle: "italic",
		marginLeft:10,
		marginTop:10,
		marginBottom:0
	},
	switchWrapper: {
		margin: 10
	},
	descriptionInput: {
		borderColor: 'gray',
		borderWidth: 1,
		fontSize: 15,
		borderRadius: 7,
		padding: 10
	}
}
