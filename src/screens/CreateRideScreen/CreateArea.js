import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TimePickerAndroid, TouchableOpacity,
        Button, TouchableHighlight, Alert, Dimensions, Platform, ScrollView } from "react-native";
import SearchBox from '../../components/SearchBox';
import { COLOR } from "../../Constants"
import CreateButton from '../../components/ActionButton';
import DirectRideSwitch from '../../components/DirectRideSwitch';


export default class CreateArea extends Component {

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
        // this.pickAndroidDate();
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }
    ShowHideTextComponentView() {
        if(this.state.showSearchArea === true)
            this.setState({showSearchArea: false})
        else
            this.setState({showSearchArea: true})
    };


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

        return (
            this.state.showSearchArea ?

            <ScrollView style={styles.container}>

                <SearchBox
                    onChangeText={(searchInputs)=>{
                        this.searchInputs = searchInputs;
                    }}/>

                <DirectRideSwitch/>

                {
                    (Platform.OS === 'ios' && this.state.showIOSDatePicker) ?
                        <View style={styles.TimeDateWrapper}>
                            <DatePickerIOS
                                date={this.state.chosenDate}
                                onDateChange={this.setDate}
                            />
                        </View>
                    : null
                }

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={()=> {
                            if (Platform.OS === 'android') {
                                this.pickAndroidDate();
                            }

                            if (Platform.OS === 'ios') {
                                this.setState((prevState) => {
                                    return {showIOSDatePicker: !prevState.showIOSDatePicker};
                                });
                            }
                        }}
                        title={
                            this.state.chosenDate ? this.state.chosenDate.toLocaleString() : "Choose Date!"
                        }/>
                </View>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.ShowHideTextComponentView();
                            this.props.onSubmit(this.searchInputs, this.state.chosenDate);
                        }}
                        title="Create Ride!"/>
                </View>
            </ScrollView> : null

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