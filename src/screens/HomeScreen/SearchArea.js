import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
        Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import Controller from './Controller';

export default class SearchArea extends Component {

	constructor(props) {
        super(props);

        this.state = {
            chosenDate: new Date(),
            showSearchArea: true,
            showIOSDatePicker: false
        };
        this.pickupInput = "";
        this.dropoffInput = "";
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }

    show(toShow) {
        this.setState({showSearchArea: toShow})
    }

    submit() {
        if (this.searchInputs !== undefined && this.searchInputs.pickupInput !== undefined && this.searchInputs.dropoffInput !== undefined) {
            Controller.drawMapRoute(this.searchInputs.pickupInput, this.searchInputs.dropoffInput);
            Controller.toggleDisplay();
            this.searchInputs = undefined;
        }
    }

    getDateString() {
        return this.state.chosenDate ? this.state.chosenDate.toLocaleString() : "";
    }

    displayDatePicker() {
        if (Platform.OS === 'android') {
            this.pickAndroidTime();
            this.pickAndroidDate();
        }
        else if (Platform.OS === 'ios') {
            this.setState((prevState) => {
                return {showIOSDatePicker: !prevState.showIOSDatePicker};
            });
        }
    }

    async pickAndroidDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.chosenDate
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                this.setDate(new Date(
                    year,
                    month,
                    day,
                    this.state.chosenDate.getHours(),
                    this.state.chosenDate.getMinutes()
                ));
            }
        }
        catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    async pickAndroidTime() {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: this.state.chosenDate.hour,
                minute: this.state.chosenDate.minute,
                is24Hour: false
            });

            if (action !== TimePickerAndroid.dismissedAction) {
                this.setDate(new Date(
                    this.state.chosenDate.getFullYear(),
                    this.state.chosenDate.getMonth(),
                    this.state.chosenDate.getDate(),
                    hour,
                    minute
                ));
            }
        }
        catch ({code, message}) {
            console.warn('Cannot open time picker', message);
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

        let iOSDatePicker; 
        if (Platform.OS === 'ios' && this.state.showIOSDatePicker) {
            iOSDatePicker = (
                <View style={styles.TimeDateWrapper}>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>);
        }

        return (
            <ScrollView style={styles.container}>

                <SearchBox
                    onChangeText={(searchInputs)=>{
                        this.searchInputs = searchInputs;
                    }}/>

                {iOSDatePicker}

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={()=> this.displayDatePicker()}
                        title={this.getDateString()}/>
                </View>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() => this.submit()}
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
    },
    TimeDateWrapper:{
        marginLeft:15,
        marginRight:10,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    }
})