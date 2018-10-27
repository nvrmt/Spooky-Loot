import React from 'react';
import {connect} from 'react-redux';
import MapRedux, {mapMarkers, getMarkerByPlaceID, fetchedPlaceID} from '../redux/MapRedux';

import firebase from 'react-native-firebase';

import {MapStyles} from '../styles';
import MapView from 'react-native-maps';
import MapCircle from "react-native-maps/lib/components/MapCircle";


class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('places');
        this.unsubscribe = null;

        this.state = {
            mapLoaded: false,
            mapMarkers: [],
            region: {
                latitude: 49.32536,
                longitude: -123.115439,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }
        };
    }

    _onRegionChangeComplete = (region) => {
        this.setState({ region });
    };

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const {coordinate} = this.state;
                const {latitude, longitude} = position.coords;

                this.setState({
                    latitude,
                    longitude
                });
            },
            error => console.log(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    componentWillUnmount() {
        if(this.unsubscribe) {
            this.unsubscribe.unsubscribe();
        }
    }

    render() {
        return (
            <MapView
                ref={ref => (this.mapRef = ref)}
                style={MapStyles.map}
                mapType={'hybrid'}
                region={this.state.region}
                onRegionChangeComplete={this._onRegionChangeComplete}
                showsUserLocation
                loadingEnabled
                onPress={this._onPress}
                onUserLocationChange={this._onUserLocationChange}
                onMapReady={this._onMapReady}
                onLongPress={this._onLongPress}
            >
                {this.state.mapMarkers.map(place => (
                    <MapCircle
                        key={place.key}
                        center={place.latlng}
                        radius={5}
                        fillColor={this.setPlaceColor(place)}
                        strokeWidth={0}
                    />
                ))}
            </MapView>
        );
    }

    setPlaceColor(place) {
        if (place.votes === 0) {
            return "#ffe340";
        } else if (place.votes >= 5) {
            return "#ffa526";
        } else if (place.votes >= 10) {
            return "#ffa62e";
        } else if (place.votes >= 15) {
            return "#ff963f";
        }
    }

    // firebase listener
    // every time an update happens to the places collection we'll update our mapMarkers state
    onCollectionUpdate = (query) => {
        const markers = [];
        query.forEach((doc) => {

            const {latlng, votes} = doc.data();

            markers.push({
                key: doc.id,
                latlng: latlng,
                votes: votes
            });
        });

        this.setState({mapMarkers: markers});
    };

    // map listeners
    _onMapReady = (e) => {
        this.setState({mapLoaded: true});
    };

    _onPress = (e) => {
        const {position, coordinate} = e.nativeEvent;

        this.props.selectPlace(coordinate);
    };

    _onUserLocationChange = (e) => {
        const {coordinate} = e.nativeEvent;
    };

    _onLongPress = (e) => {
        const {position, coordinate} = e.nativeEvent;
        this.props.findPlace(coordinate);
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadedMarkers: mapMarkers(state),
        getMarkerByPlace: getMarkerByPlaceID(state, ownProps),
        getFetchedPlaceID: fetchedPlaceID(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMapExtras: (mapObject : Object) => dispatch(MapRedux.loadMapRequest(mapObject)),
        findPlace: (mapObject : Object) => dispatch(MapRedux.findPlaceRequest(mapObject)),
        selectPlace: (mapObject : Object) => dispatch(MapRedux.selectPlaceRequest(mapObject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
