import React, { Component } from "react";
import { View, Text, StyleSheet, DatePickerIOS, TouchableOpacity, Button, TouchableHighlight, Alert, Dimensions } from "react-native";
import SearchBox from 'Gaucho-Rides/src/components/SearchBox';
import SearchResults from 'Gaucho-Rides/src/components/SearchResults';

export default class RiderMain extends Component {

	constructor(props) {
        super(props);

        this.state = {
            chosenDate: new Date(),
            status: true
           
        }
        this.setDate = this.setDate.bind(this);
        
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }
    
    ShowHideTextComponentView = () =>{
        if(this.state.status==true){
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    }

    _onPress() { //for done button
      
    }

    render() {
        return (
            this.state.status ? 
            <View style={styles.container}>
                <SearchBox/>

                <View style={styles.TimeDateWrapper}>
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button onPress={this.ShowHideTextComponentView} title="Find Ride!" color="#FFFFFF" />
                </View>

            </View>

            : null
        );
        
    }
}

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'center'

        
	},
    buttonContainer: {
        backgroundColor: '#2E9298',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
         width: 0,
         height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,

    
    },
    TimeDateWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:46.34,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    }
})