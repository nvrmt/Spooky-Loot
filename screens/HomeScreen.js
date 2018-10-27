import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {connect} from 'react-redux';

import MapContainer from "../containers/MapContainer";

import { getDisplayName, getVotesLeft, getDisplayPicture } from "../redux/UserRedux";

import ProfileCard from '../components/map/ProfileCard';

import {styles} from "../styles";


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapContainer />
                <ProfileCard
                    displayName={this.props.userDisplayName}
                    displayPicture={this.props.userDisplayPicture}
                    votes={this.props.userVotesLeft}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDisplayName: getDisplayName(state),
        userDisplayPicture: getDisplayPicture(state),
        userVotesLeft: getVotesLeft(state)
    };
};

export default connect(mapStateToProps, null)(HomeScreen);