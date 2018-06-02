import { Dimensions } from "react-native";
let width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:0,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:10,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7
    },
    inputSearch:{
        fontSize:14
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center'
    },
    DescriptionWrapper: {
        margin: 10
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginRight:30,
        marginBottom:50

    },
     container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
        //paddingTop: 22
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5

    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    startLocation:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFEEE4'
    },
    endLocation:{
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFEEE4'
    },
    dateofRide:{
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFEEE4'
    }

 
};

export default styles;
