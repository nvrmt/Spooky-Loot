import React from 'react';
import {connect} from 'react-redux';
import Map from "../components/Map";

import Styles from "../styles";

class MapContainer extends React.Component {
    render() {
        return (
            <Map onPress={this.onMapPress}/>
        );
    }

    // map listeners
    onMapPress = () => {
        console.log("Test");
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);