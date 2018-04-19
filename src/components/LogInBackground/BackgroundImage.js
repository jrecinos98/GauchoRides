import React, {Component} from "react";
import {ImageBackground, StyleSheet} from "react-native"

export class LogInBackgroundImage extends Component {

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
        padding: 10,
        flexDirection: "column",
        justifyContent: 'flex-end',
        //alignItems: "flex-end",
        //justifyContent: "space-between"

    }
});
