import React, {Component} from "react";
import {ImageBackground, StyleSheet} from "react-native"

export default class LoginBackground extends Component {

    render() {
        return (
            <ImageBackground source={require("../../../public/assets/ucsb_background.jpg")}
                             style={styles.backgroundImage}
                //imageStyle is used because we only want to apply the stretch to the image
                // not the entire view hierarchy
                             imageStyle={{resizeMode: 'stretch'}}
            >

                {this.props.children}

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        padding: 5,
        flexDirection: "column",
        //justifyContent: 'flex-end',
        justifyContent: "center"

    }
});
