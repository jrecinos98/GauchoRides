import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
        Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import Controller from './Controller';
import DirectRideSwitch from '../../components/DirectRideSwitch';
import DatePicker from '../../components/DatePicker';
import {extractCity} from "../../Utility";
import Database from "../../Database"
import {getOriginLatLon} from "../../Utility";
import {getDestLatLon} from "../../Utility";

export default class SearchArea extends Component {

	constructor(props) {
        super(props);

        this.state = {
            showSearchArea: true,
            rides: {}
        };
        this.pickupInput = "";
        this.dropoffInput = "";
        this.chosenDate = new Date();
    }

    show(toShow) {
        this.setState({showSearchArea: toShow})
    }

    async submit() {
        if (this.searchInputs !== undefined && this.searchInputs.pickupInput !== undefined && this.searchInputs.dropoffInput !== undefined) {

           // Controller.drawMapRoute(this.searchInputs.pickupInput, this.searchInputs.dropoffInput);

            Controller.toggleDisplay();
            let origin = extractCity(this.searchInputs.pickupInput);
            let destin = extractCity(this.searchInputs.dropoffInput);
            Controller.showSpinner(true);
            await Database.getRides(origin, destin,(rideList) => {
                this.setState( {rides: rideList});
                console.log("Rides: " , this.state.rides);
                Controller.displayRides(rideList);
                Controller.showSpinner(false);
               //for (let i=0; i< this.state.rides.length; i++){
                    //Controller.drawMapRoute(getOriginLatLon(this.state.rides[i]), getDestLatLon(this.state.rides[i]
               // Controller.displayRides(this.state.rides);
            });
            this.searchInputs = undefined;
            this.chosenDate = new Date();
        }
    }

    render() {
        if (!this.state.showSearchArea)
            return null;

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

                <DirectRideSwitch/>

                <DatePicker
                    color_theme={this.props.color_theme}
                    onDateChange={(date) => {
                        this.chosenDate = date;
                    }}/>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.submit().then(()=>{
                                //console.log(this.state.rides);
                            });
                        }}
                        title="Find Ride!"/>
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
    }
})