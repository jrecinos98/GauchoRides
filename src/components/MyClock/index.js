import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../Constants";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	curTime : '--:--'
        };
    }

    componentDidMount() {
	    setInterval( () => {
	    	this.setState({
	    		curTime : this.formatDate(new Date())
	      	});
	    }, 1000);
	}

	formatDate(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

    render() {

    	const customStyle = {
    		clockText: [styles.clockText, {
    			color: this.props.color_theme.APP_FOCUS
    		}]
    	}

        return (
        	<Text style={customStyle.clockText}>{this.state.curTime}</Text>
        );
    }

}

const styles = StyleSheet.create({
	clockText: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 10,
        paddingTop: 3
	}
});
