import React from 'react';

import { View, Image } from 'react-native';

import spookyLogo from '../images/logo.png';

import {styles} from "../styles";

export default class Logo extends React.Component {
    render() {
        return (
            <View style={styles.logo}>
                <Image source={spookyLogo}/>
            </View>
        );
    }
}
