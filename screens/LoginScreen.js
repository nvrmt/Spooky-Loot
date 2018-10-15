import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import connect from "react-redux/es/connect/connect";

//Components
import Logo from "../components/Logo";
import Login from "../components/Login";

//Selectors
import AuthRedux, { isUserAuthenticated } from "../redux/AuthRedux";


class LoginScreen extends React.Component {
    render() {
        console.log(this.props);

        return (
            <View style={styles.container}>
                <Login />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff4a1a',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => {
    return {
        hasAuth: isUserAuthenticated(state)
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);