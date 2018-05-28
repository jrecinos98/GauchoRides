import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
		Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import DirectRideSwitch from '../../components/DirectRideSwitch';
import SeatPicker from '../../components/SeatPicker';
import DatePicker from '../../components/DatePicker';
<<<<<<< HEAD:src/screens/CreateRideScreen/CreateArea.js
=======
import PriceInput from '../../components/PriceInput';
>>>>>>> 2b137126c15b85201363517f09c154c75b8e76ea:src/screens/CreateScreen/CreateArea.js
import DescriptionBox from '../../components/DescriptionBox';

export default class CreateArea extends Component {

    constructor(props) {
        super(props);
        this.pickupInput = "";
        this.dropoffInput = "";
        this.chosenDate = new Date();
<<<<<<< HEAD:src/screens/CreateRideScreen/CreateArea.js
        this.chosenSeats = 0;
        this.description = "";
=======
        this.chosenSeats = 1;
        this.description = "My Ride";
        this.price = 15;
>>>>>>> 2b137126c15b85201363517f09c154c75b8e76ea:src/screens/CreateScreen/CreateArea.js
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
                    onChangeText={(searchInputs) => {
                        this.searchInputs = searchInputs;
                    }}/>
                <View style={styles.seatPriceContainer}>
                    <SeatPicker
                        color_theme={this.props.color_theme}
                        onSeatsChange={(seats) => {
                            this.chosenSeats = seats;
                        }}/>
                    <PriceInput
                       // color_theme={this.props.color_theme}
						title={"Price"}
                        onPriceChange={(price) => {
                            if (price === "" || isNaN(price)){
                                this.price= 15;
                            }
                            else{
                                this.price = parseFloat(price);
                            }
                        }}
                    />
                </View>
                <DescriptionBox
                    color_theme={this.props.color_theme}
					description={"Additional information ..."}
                    onTextChange={(text) => {
                        this.description = text;
                    }}
                />
                <DirectRideSwitch/>

<<<<<<< HEAD:src/screens/CreateRideScreen/CreateArea.js
                <DescriptionBox
                    onChangeText={(searchInputs)=>{
                        this.searchInputs = searchInputs;
                    }}/>
=======
>>>>>>> 2b137126c15b85201363517f09c154c75b8e76ea:src/screens/CreateScreen/CreateArea.js

                <DatePicker
                    color_theme={this.props.color_theme}
                    onDateChange={(date) => {
                        this.chosenDate = date;
                    }}/>


                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.props.onSubmit(this.searchInputs, this.chosenDate, this.chosenSeats, this.description, this.price);
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
