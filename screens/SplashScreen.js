import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {connect} from 'react-redux';

//Components
import Logo from "../components/Logo";
import UpdateStatus from "../components/Status";

//Selectors
import InitRedux from "../redux/StartupRedux";

import {DefaultStyles} from "../styles";


class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.props.startAppInit();
    }

    render () {
        return (
            <View style={DefaultStyles.container}>
                <Logo />
                <UpdateStatus header={"Status"} message={this.props.updateStatus} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        updateStatus: state.updater.updateStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAppInit: (payload : Object) => dispatch(InitRedux.startupRequest(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);