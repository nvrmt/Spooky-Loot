import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import Map from "../components/Map";

import Styles from "../styles";

class HomeScreen extends React.Component {
    render() {
        //const store = this.props.store;
        // const state = store.getState();

        return (
            <View style={Styles.container}>
                <Map/>
            </View>
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