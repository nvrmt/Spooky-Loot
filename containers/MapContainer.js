import React from 'react';
import {connect} from 'react-redux';
import MapRedux, {mapMarkers} from '../redux/MapRedux';

import {MapStyles} from "../styles";
import MapView from "react-native-maps";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLoaded: false
        };
    }
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { coordinate } = this.state;
                const { latitude, longitude } = position.coords;
                console.log(coordinate);

                this.setState({
                    latitude,
                    longitude
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {

        return (
            <MapView
                ref={(ref) => this.mapRef = ref}
                style={MapStyles.map}
                mapType={'hybrid'}
                region={{
                    latitude: 49.325360,
                    longitude: -123.115439,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation
                showsMyLocationButton
                followsUserLocation
                loadingEnabled
                minZoomLevel={15}
                onPress={this.onPress}
                onUserLocationChange={this.onUserLocationChange}
                onCalloutPress={this.onCalloutPress}
                onMapReady={this.onMapReady}
            >
            {this.props.loadedMarkers.map(marker => (
                <MapView.Marker
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                />
            ))}
            </MapView>
        );
    }

    // map listeners
    onMapReady = (e) => {
        this.setState({mapLoaded: true});
    };

    onPress = (e) => {
        const { position, coordinate } = e.nativeEvent;
        this.mapRef.animateToCoordinate(coordinate, 1000);
        this.props.findPlace(coordinate);
    };

    onUserLocationChange = (e) => {
        const { coordinate } = e.nativeEvent;
    };

    onCalloutPress = (e) => {

    };
}

const mapStateToProps = (state) => {
    return {
        loadedMarkers: mapMarkers(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMapExtras: (mapObject : Object) => dispatch(MapRedux.loadMapRequest(mapObject)),
        findPlace: (mapObject : Object) => dispatch(MapRedux.findPlaceRequest(mapObject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);