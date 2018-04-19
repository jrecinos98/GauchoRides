import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, DatePickerAndroid, TouchableOpacity, Button, TouchableHighlight, Alert, Dimensions, Platform} from "react-native";
import SearchBox from '../../components/SearchBox';
import {COLOR_APP_BACKGROUND, COLOR_APP_FOCUS} from "../../Constants"
import SearchResults from 'Gaucho-Rides/src/components/SearchResults';

export default class SearchArea extends Component {

	constructor(props) {
        super(props);

        this.state = {
            chosenDate: new Date(),
            status: true

        };
        this.setDate = this.setDate.bind(this);
       // this.pickAndroidDate();
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }

    ShowHideTextComponentView = () =>{
        if(this.state.status === true){
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    };

    async pickAndroidDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.chosenDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setDate(new Date(year, month, day));
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            this.state.status ?

            <View style={styles.container}>

                <SearchBox/>

                {(Platform.OS === 'ios')?
                <View style={styles.TimeDateWrapper}>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View> : <Text style={{ marginLeft:15,
                        marginRight:10,
                        marginTop:30,
                        marginBottom:0}}> This is Android Device. </Text>  }
                <View style={styles.buttonContainer}>
                    <Button onPress={this.ShowHideTextComponentView} title="Find Ride!">
                        <Text > Find Ride! </Text>
                    </Button>
                </View>

            </View> : null

        );

    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center'
	},
    buttonContainer: {
        marginLeft:15,
        marginRight:10,
        marginTop:10,
        marginBottom:0,
        backgroundColor: COLOR_APP_BACKGROUND,
        opacity:0.9,
        borderRadius: 10,
        padding: 10,
        shadowColor: COLOR_APP_FOCUS,
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
        marginTop:150,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    }
})