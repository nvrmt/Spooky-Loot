import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import MapContainer from "../containers/MapContainer";

import Popup from '../components/Popup';

import Styles, {styles} from "../styles";

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapContainer />
                <Popup popupHeader={"Spooky Loot Alpha!"}
                       popupBody={"Fetch body."}
                       onPress={this.onPopupPress}/>
            </View>
        );
    }

    onPopupPress = () => {
        console.log("We clicked on the continue button...");
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);