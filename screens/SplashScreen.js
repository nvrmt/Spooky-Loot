import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import connect from "react-redux/es/connect/connect";

//Components
import Logo from "../components/Logo";
import UpdateStatus from "../components/UpdateStatus";

//Redux
import UpdaterRedux from "../redux/UpdaterRedux";

//Selectors
import AuthRedux, { isUserAuthenticated } from "../redux/AuthRedux";


class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.props.getVersion();

        // if(this.props.hasAuth) {
        //     this.props.navigation.navigate('Splash');
        // } else {
        //     this.props.navigation.navigate('Login');
        // }
    }

    render () {
        return (
            <View style={styles.container}>
                <Logo />
                <UpdateStatus />
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
        getVersion: () => dispatch(UpdaterRedux.getVersion()),
        checkAuth: () => dispatch(AuthRedux.authCheckQuick()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);