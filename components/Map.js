import React from 'react';
import MapView from 'react-native-maps';
import MapRedux from "../redux/MapRedux";
import {connect} from "react-redux";

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.tron.log(this.props.store)
    }

    onPress(e) {
        const coords = e.nativeEvent.coordinate;
        this.mapRef.animateToCoordinate(coords, 1000);
    }

    render() {
        return (
            <MapView
                ref={(ref) => this.mapRef = ref}
                style={this.props.style}
                region={{
                    latitude: 49.325360,
                    longitude: -123.115439,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                minZoomLevel={18}
                onPress={(e) => this.onPress(e)}
                // onUserLocationChange={(e) => this.props.onUserChanged(e)}
                // onCalloutPress={(e) => this.props.onCalloutPress(e)}
                // onMapReady={(e) => this.props.onMapReady(e)}
            >
            </MapView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        map: state.mapRef
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);