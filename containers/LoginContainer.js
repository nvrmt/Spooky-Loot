import React from 'react';
import {connect} from 'react-redux';

import LoginRedux from '../redux/AuthRedux';

import { Container, Header, Content, Button, Text } from 'native-base';

import InitRedux from "../redux/StartupRedux";

import { AuthStyles } from '../styles';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={AuthStyles.loginButton} rounded onPress={this.onPress}>
                <Text>Connect with Facebook</Text>
            </Button>
        );
    }

    onPress = () => {
        this.props.login();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload : Object) => dispatch(LoginRedux.loginRequest(payload)),
    };
};

export default connect(null, mapDispatchToProps)(LoginContainer);