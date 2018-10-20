import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {connect} from "react-redux";

//Components
import Logo from "../components/Logo";


import LoginContainer from "../containers/LoginContainer";
import {AuthStyles} from "../styles";

//Selectors
import AuthRedux, { isUserAuthenticated } from "../redux/AuthRedux";

class AuthScreen extends React.Component {
    render() {
        return (
            <View style={AuthStyles.container}>
                <Logo />
                <LoginContainer />
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