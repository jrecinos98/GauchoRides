import React, { Component } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Platform } from "react-native";
import SearchBox from '../../components/SearchBox';
import DatePicker from '../../components/DatePicker';
import DescriptionBox from '../../components/DescriptionBox'
import PriceInput from '../../components/PriceInput'

export default class RequestArea extends Component {

    constructor(props) {
        super(props);
        this.pickupInput = "";
        this.dropoffInput = "";
        this.chosenDate = new Date();
        this.description="";
        this.price= 15;
    }

    submit() {
        if (this.searchInputs !== undefined && this.searchInputs.pickupInput !== "" && this.searchInputs.dropoffInput !== "") {
            this.props.onSubmit(this.searchInputs, this.chosenDate);
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
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps={"handled"}>

                <SearchBox
                    originTag={this.props.originTag}
                    destinationTag={this.props.destinationTag}
                    onChangeText={(searchInputs)=>{
                        this.searchInputs = searchInputs;
                    }}/>

                <PriceInput
                    title={"Amount Offered"}
                    onPriceChange={(price) => {
                        if (price === "" || isNaN(price)) {
                            this.price = 15;
                        }
                        else {
                            this.price = parseFloat(price);
                        }
                    }}

                />
                <DescriptionBox
                    description={"Additional information ..."}
                    onTextChange={(text) => {
                        this.description = text;
                    }}
                />
                <DatePicker
                    color_theme={this.props.color_theme}
                    onDateChange={(date) => {
                        this.chosenDate = date;
                    }}/>

                <View style={customStyle.buttonContainer}>
                    <Button
                        onPress={() =>
                            this.props.onSubmit(this.searchInputs, this.chosenDate, 0 , this.description, this.price)
                        }
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
