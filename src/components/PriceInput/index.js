import React, { Component } from "react";
import { Text,TextInput } from "react-native";
import { View, InputGroup, Input } from "native-base";
import {Ionicons} from '@expo/vector-icons';


export default class PriceInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}
    updateText(text){
        this.setState({text});
        this.props.onPriceChange(text)
    }
	render() {
        return (
            <View style={styles.box}>
                <Text style={styles.label}>Price</Text>
                <View style={styles.container}>
                    <Text style={styles.dollarSign}>
                        $
                    </Text>
                    <TextInput
                        style={styles.dollarInput}
                        onChangeText={(text) => this.updateText(text)}
                        value={this.state.text}
                        maxLength={10}
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
        fontSize: 30
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    },
    switchWrapper: {
        margin: 20
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
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7
    }
}
