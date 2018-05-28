import React, { Component } from "react";
import { Text,TextInput } from "react-native";
import { View, InputGroup, Input } from "native-base";



export default class PriceInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
            max: 10
		};
        this.decimalIndex= 100;
        this.decimalPlaced= false;
	}


    updateText(amount) {
        var lastNum= "0";
        var splitNum= undefined
	    if (amount.length> 0) {
            splitNum = amount.split("");
            lastNum= splitNum[amount.length - 1];
        }
        let numbers="0123456789.";
       // console.log(lastNum)
        for (var i=0; i< numbers.length; i++){
            //if the first decimal has been placed don't place another one
            if((this.decimalPlaced && lastNum === "." && this.decimalIndex !== amount.length-1)
                //If lastNum isn't a number
                || numbers.indexOf(lastNum) <=-1
                //If two consecutive zeros placed at beginning dont allow it.
                || (amount.length===2 && splitNum[0]==='0' && lastNum==="0" && !this.decimalPlaced)) {
                return;
            }
        }
        if (lastNum !== "-" && lastNum !== ",") {
            var newAmount=amount;
            if (lastNum === "." && !this.decimalPlaced) {
                if(amount.length===1 || (splitNum[0]=== "0" && amount.length === 1)){
                    newAmount="00"+".";
                }
                if(amount.length===2 && lastNum === "."){
                    newAmount= "0"+amount;
                }
                this.decimalIndex = newAmount.length - 1;
                this.decimalPlaced= true;
                this.setState({text: newAmount+"00", max: newAmount.length + 2});
                this.props.onPriceChange(newAmount)
            }
            else {

                if((newAmount.length > 2 && splitNum[0] === "0" && !this.decimalPlaced)){
                    newAmount= newAmount.slice(1);
                }
                if (newAmount.length <= this.decimalIndex) {
                    this.decimalIndex = 100;
                    this.decimalPlaced=false;
                    this.setState({max: 10})
                }
                this.setState({text: newAmount});
                this.props.onPriceChange(newAmount)
            }
        }
    }

    render() {
        return (
            <View style={styles.box}>
                <Text style={styles.label}>{this.props.title}</Text>
                <View style={styles.container}>
                    <Text style={styles.dollarSign}>
                        $
                    </Text>
                    <TextInput
                        style={styles.dollarInput}
                        onChangeText={(text) => this.updateText(text)}
                        value={this.state.text}
                        maxLength={this.state.max}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        placeholder="15.00"
                        keyboardType="numeric"
                    />

                </View>
            </View>
        );
    }
}

const styles = {
    box:{
        marginRight:10,
        marginTop:0,
        marginBottom:5,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7,
        flex: 1
    },
    dollarSign: {
        fontSize: 20,
				marginRight: 5
    },
    label:{
        fontSize:12,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dollarInput: {
        textAlign: 'center',
        fontSize: 20,
        height: 35,
        width: 85,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7
    }
}
