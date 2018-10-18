import React from 'react';
import {connect} from 'react-redux';
import Login from "../components/Login";

import LoginRedux from '../redux/AuthRedux';


class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Login />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: () => dispatch(LoginRedux.loginRequest),
    };
};

export default connect(null, mapDispatchToProps)(LoginContainer);