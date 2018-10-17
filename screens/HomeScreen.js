import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import MapContainer from "../containers/MapContainer";

import Styles from "../styles";

class HomeScreen extends React.Component {
    render() {
        return (
            <MapContainer />
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);