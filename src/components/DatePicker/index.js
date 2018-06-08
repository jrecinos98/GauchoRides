import React, { Component } from "react";
import { View, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, Platform, Button } from "react-native";
import Constants from "../../Constants";

/**
 * Component that utilizes the native date picker and time picker depending on the OS. Allows user to select a time and a date.
 */
export default class DatePicker extends Component {

	constructor(props) {
        super(props);

        this.state = {
            chosenDate: new Date(),
            showIOSDatePicker: false
        };
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
        this.props.onDateChange(newDate);
    }

    getDateString() {
        return this.state.chosenDate ? this.state.chosenDate.toLocaleString() : "";
    }

    displayDatePicker() {
        if (Platform.OS === 'android') {
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
                this.pickAndroidTime();
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
                        onDateChange={(date) => this.setDate(date)}
                    />
                </View>);
        }

        return (
            <View style={styles.container}>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={()=> this.displayDatePicker()}
                        title={this.getDateString()}/>
                </View>

                {iOSDatePicker}

            </View>
        );

    }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'column'
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