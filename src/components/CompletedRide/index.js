import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";
import {Ionicons} from '@expo/vector-icons';

export default class CompletedRide extends Component {
    constructor(props) {
        super(props)
    }

    epochToDate(epoch) {

        var d = new Date(epoch * 1000);
        return d;
    }



    //riderOrDriver(){
    //    if(this.props.item.)
    //}



    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.props.onPress()}>

                <Image source={require("../../../public/assets/completed_ride.png")}
                       style={{
                           width: 65,
                           height: 65,
                           resizeMode: "contain"
                       }}/>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
                    <Text style={styles.originTextSyle}>
                        From: {this.props.item.origin.name}
                    </Text>
                    <Text style={styles.destinTextStyle}>
                        To: {this.props.item.destination.name}
                    </Text>

                    <Text style={styles.dateTextStyle}>
                        Date: {this.epochToDate(this.props.item.time).toString()}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3
    },
    originTextSyle: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 10
    },
    destinTextStyle: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    dateTextStyle: {
        fontSize: 16,
        color: 'grey'
    }
};