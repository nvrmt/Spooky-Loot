import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import connect from "react-redux/es/connect/connect";

//Components
import Logo from "../components/Logo";
import Login from "../components/Login";

import {DefaultStyles} from "../styles";

//Selectors
import AuthRedux, { isUserAuthenticated } from "../redux/AuthRedux";


class AuthScreen extends React.Component {
    render() {
        return (
            <View style={DefaultStyles.container}>
                <Logo />
                <Login />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        hasAuth: isUserAuthenticated(state)
    }
};
const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);