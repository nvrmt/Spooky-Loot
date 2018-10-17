import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

export default class Map extends React.Component {
    render() {
        MapboxGL.setAccessToken('pk.eyJ1Ijoic25hdmVyaXMiLCJhIjoiY2lzOGVnendyMDVwcTJvcG5uam91Mmc2ZCJ9.vwza4kEAEpQEllzH5g0HwA');
        return (
            <MapboxGL.MapView
                styleURL={MapboxGL.StyleURL.Dark}
                zoomLevel={15}
                centerCoordinate={[-123.120, 49.3236]}
                style={styles.container}
                animated={true}
                onPress={this.props.onPress}
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
