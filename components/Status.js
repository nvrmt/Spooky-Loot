import React from 'react';
import { View, Text } from 'react-native';

export default class Status extends React.Component {
    render() {
        return (
            <Text>{this.props.header}: {this.props.message}</Text>
        );
    }
}