import {COLOR_APP_BACKGROUND_OPAQUE, COLOR_APP_FOCUS} from "../../Constants";
import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: COLOR_APP_BACKGROUND_OPAQUE,
        //alignItems: 'center',
        justifyContent: 'center',
        //justifyContent: 'space-between'
    },
    input: {
        height: 40,
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonText:{
        textAlign: 'center',
        color: "#FFFFFF",
        fontWeight: "700"
    },
    buttonContainer: {
        paddingVertical: 15,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#0d47a1',
        borderRadius: 10,
        shadowColor: COLOR_APP_FOCUS,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
    },
    LabelStyle: {
        color: 'white'

    }

});
export default styles;