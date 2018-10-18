import React from 'react';

import { Button } from 'react-native';

export default class Login extends React.Component {
    render() {
        return <Button
            onPress={ () => this.props.loginRequest() }
            title="Connect with Facebook"
            color="#FF5E00"/>;
    }
}