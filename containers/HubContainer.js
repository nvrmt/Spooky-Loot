// HubContainer
// This will be the screen you go to after login was a success

import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import Map from "../components/Map";

class HubContainer extends React.Component {
    render() {
        //const store = this.props.store;
       // const state = store.getState();

        return (
            <View style={styles.container}>
                <Map/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#81a0cc',
        alignItems: 'center'
    },
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HubContainer);