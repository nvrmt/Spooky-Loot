import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {connect} from 'react-redux';

//Components
import Logo from "../components/Logo";
import UpdateStatus from "../components/Status";

import {styles} from "../styles";


class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render () {
        return (
            <View style={styles.container}>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);