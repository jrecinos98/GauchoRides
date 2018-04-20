import {COLOR_APP_BACKGROUND_OPAQUE, COLOR_APP_FOCUS, COLOR_BACKGROUND_LOGIN_BUTTON} from "../../Constants";
import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: COLOR_APP_BACKGROUND_OPAQUE,
        //alignItems: 'center',
        //justifyContent: 'center',
        //justifyContent: 'space-between'
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginTop:10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonText:{
        textAlign: 'center',
        color: "#FFFFFF",
        fontWeight: "700",
        textShadowColor:'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    buttonContainer: {
        paddingVertical: 12,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: COLOR_BACKGROUND_LOGIN_BUTTON,
        borderRadius: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    LabelStyle: {
        color: 'white'

    }

});
export default styles;