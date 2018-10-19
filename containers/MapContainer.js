import React from 'react';
import {connect} from 'react-redux';
import Map from "../components/Map";

import { Button, View } from 'react-native';

import MapRedux from '../redux/MapRedux';

import {MapStyles} from "../styles";
import MapView from "react-native-maps";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLoaded: false,
            markers: []
        };
    }

    render() {
        return (
            <View style={MapStyles.container}>
                <MapView
                    ref={(ref) => this.mapRef = ref}
                    style={MapStyles.map}
                    region={{
                        latitude: 49.325360,
                        longitude: -123.115439,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    minZoomLevel={18}
                    onPress={this.onPress}
                    onUserLocationChange={this.onUserChanged}
                    onCalloutPress={this.onCalloutPress}
                    onMapReady={this.onMapReady}
                >
                </MapView>
            </View>
        );
    }

    // map listeners
    onMapReady = (e) => {
        console.tron.logImportant(this.props);
        this.setState({mapLoaded: true});

        this.props.loadMapExtras(this.props.mapView);
    };

    onPress = (e) => {
        const { position, coordinate } = e.nativeEvent;
        this.mapRef.animateToCoordinate(coordinate, 1000);

    };

    onUserLocationChange = (e) => {
        const { coordinate } = e.nativeEvent;
    };

    onCalloutPress = (e) => {

    };
}

const mapStateToProps = (state) => {
    return {
        mapView: state.map.mapView
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMapExtras: (mapObject : Object) => dispatch(MapRedux.loadMapRequest(mapObject)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);