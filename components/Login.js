import React from 'react';

import { Button } from 'react-native';
import AuthRedux from "../redux/AuthRedux";
import { connect } from 'react-redux';

class Login extends React.Component {
    render() {
        return <Button
            onPress={ () => this.props.login() }
            title="Connect with Facebook"
            color="#FF5E00"/>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(AuthRedux.loginRequest())
    }
};


export default connect(null, mapDispatchToProps)(Login);