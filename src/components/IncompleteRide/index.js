import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import User from "../../actors/User";
import Utility from "../../Utility"

export default class IncompleteRide extends Component {
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

                <Ionicons name="ios-car" size={65}/>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
                    <Text style={styles.roleStyle}>Role: {this.props.item.driver === User.currentUser.id? "Driver": "Passenger"}</Text>
                    <Text style={styles.originTextSyle}>
                        From: {this.props.item.origin.name}
                    </Text>
                    <Text style={styles.destinTextStyle}>
                        To: {this.props.item.destination.name}
                    </Text>

                    <Text style={styles.dateTextStyle}>
                        Date: {Utility.formatDate(new Date(1000*this.props.item.time))}
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
    roleStyle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10
    },
    originTextSyle: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10
    },
    destinTextStyle: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10,
    },
    dateTextStyle: {
        fontSize: 16,
        color: 'black'
    }
};