import React, { Component } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Platform } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import CustomSwitch from '../../components/CustomSwitch';
import SeatPicker from '../../components/SeatPicker';
import DatePicker from '../../components/DatePicker';
import PriceInput from '../../components/PriceInput';
import DescriptionBox from '../../components/DescriptionBox';

export default class CreateArea extends Component {

    constructor(props) {
        super(props);
        this.pickupInput = "";
        this.dropoffInput = "";
        this.chosenDate = new Date();
        this.description = "";
        this.chosenSeats = 1;
        this.price = 15;
    }

    render() {

        const customStyle = {
            buttonContainer: [styles.buttonContainer, {
                backgroundColor: this.props.color_theme.APP_BACKGROUND,
                shadowColor: this.props.color_theme.APP_UNFOCUS
            }]
        };

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps={"handled"}>

                <SearchBox
                    originTag={this.props.originTag}
                    destinationTag={this.props.destinationTag}
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
                            if (price === "" || isNaN(price)) {
                                this.price = 15;
                            }
                            else {
                                this.price = parseFloat(price);
                            }
                        }}/>
                </View>

                <DescriptionBox
                    description={"Additional information ..."}
                    onTextChange={(text) => {
                        this.description = text;
                    }}/>

                <CustomSwitch label={"Auto-Fill"}/>

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
});
