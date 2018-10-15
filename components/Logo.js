import React from 'react';

import { View, Image } from 'react-native';

import spookyLogo from '../images/logo.png';

export default class Logo extends React.Component {
    render() {
        return (
            <View>
                <Image source={spookyLogo}/>
            </View>
        );
    }
}
