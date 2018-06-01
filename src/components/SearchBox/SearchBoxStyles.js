import { Dimensions } from "react-native";
let width = Dimensions.get("window").width; //full width
const styles = {
    container:{
        width: width
    },
    inputSearch:{
        fontSize:14
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center'
    },
    searchBox: {
        textInputContainer: {
            backgroundColor:"#ffffff",
            opacity:0.7,
            borderRadius:7,
            height: 50
        },
        textInput: {
            height: 48,
            marginTop:0,
            color: '#000000'
        },
        description: {
            fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
            color: '#000000'
        },
        container: {
            marginLeft:15,
            marginRight:10,
            marginTop:0,
            marginBottom:5,
            backgroundColor:"#ffffff",
            opacity:0.7,
            borderRadius:7
        }
    },
    searchIcon: {
        alignSelf: 'center',
        left: 5
    }
};

export default styles;
