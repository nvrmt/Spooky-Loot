import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

//Components
import Logo from "../components/Logo";
import LoginContainer from "../containers/LoginContainer";

import {AuthStyles} from "../styles";

export default class AuthScreen extends React.Component {
    render() {
        return (
            <View style={AuthStyles.container}>
                <Logo />
                <LoginContainer />
            </View>
        )
    }
}