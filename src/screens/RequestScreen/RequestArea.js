import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
        Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import DatePicker from '../../components/DatePicker';


export default class RequestArea extends Component {

    constructor(props) {
        super(props);
        this.pickupInput = "";
        this.dropoffInput = "";
        this.chosenDate = new Date();
    }

    submit() {
        if (this.searchInputs !== undefined && this.searchInputs.pickupInput !== undefined && this.searchInputs.dropoffInput !== undefined) {
            this.props.onSubmit(this.searchInputs, this.chosenDate, this.chosenSeats);
            this.searchInputs = undefined;
            this.chosenDate = new Date();
        }
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

                <DatePicker
                    color_theme={this.props.color_theme}
                    onDateChange={(date) => {
                        this.chosenDate = date;
                    }}/>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() => this.submit()}
                        title="Request Ride!"/>
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
    seatSlider: {
        marginLeft: 20,
        marginRight: 20
    }
})
