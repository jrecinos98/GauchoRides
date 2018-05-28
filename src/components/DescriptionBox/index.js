import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { COLOR } from "../../Constants";

/**
 * Returns a component that contains two text inputs to collect email and password in Login screen.
 */
export default class DescriptionBox extends Component {

    constructor(props) {
        super(props);
        this.description = "";
    }

    render() {
        return (
          <View style={styles.secondInputWrapper}>
          <Text style={styles.label}>{"About Me (Optional)"}</Text>
            <View style={styles.textContainer}>
                <TextInput style={styles.input}
                  multiline={true}
                  maxLength={250}
                  keyboardType="default"
                  placeholderTextColor={null}
                  placeholder="Description"
                  autoCapitalize={"sentences"}
                  onChangeText={(description) => {
                      this.description = description;
                  }}/>
            </View>
          </View>
        );
    }

}

const styles = {
    textContainer: {
        backgroundColor: COLOR.THEME_DARK.APP_BACKGROUND_OPAQUE,
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginTop:10,
        color: '#000000',
        paddingHorizontal: 10
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
    		marginBottom:5,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    }
}
