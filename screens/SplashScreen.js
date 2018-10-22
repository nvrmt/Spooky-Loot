import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {connect} from 'react-redux';
import { PermissionsAndroid } from 'react-native';

//Components
import Logo from "../components/Logo";
import UpdateStatus from "../components/Status";

import {styles} from "../styles";


class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let requested = this.requestAndroidFineLocation();
    }

    async requestAndroidFineLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Spooky Loot',
                    'message': 'Spooky Loot needs access to your location, as' +
                        'this is a map based app.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission to use gps granted.");
            }
        } catch (err) {
            console.warn(err);
        }
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