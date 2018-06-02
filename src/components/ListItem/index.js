import React, {Component} from "react";
import {
    Text,
    View,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';

export default class ListItem extends Component {
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
            <View style={styles.container}>

                <Ionicons name="ios-car" size={65}/>

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
            </View>
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