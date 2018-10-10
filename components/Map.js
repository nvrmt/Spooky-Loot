import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

export default class Map extends React.Component {
    render() {
        Mapbox.setAccessToken('pk.eyJ1Ijoic25hdmVyaXMiLCJhIjoiY2lzOGVnendyMDVwcTJvcG5uam91Mmc2ZCJ9.vwza4kEAEpQEllzH5g0HwA');
        return (
            <Mapbox.MapView
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={10}
                centerCoordinate={[-122.9714, 49.3266]}
                showUserLocation={true}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});
