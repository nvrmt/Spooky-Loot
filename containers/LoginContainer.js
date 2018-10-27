import React from 'react';
import { connect } from 'react-redux';

import AuthRedux from '../redux/AuthRedux';

import { Container, Header, Content, Button, Text } from 'native-base';

import { AuthStyles } from '../styles';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Button style={AuthStyles.loginButton} block onPress={this.onPress}>
				<Text>Connect with Facebook</Text>
			</Button>
		);
	}

	onPress = () => {
		this.props.login();
	};
}

const mapDispatchToProps = dispatch => {
	return {
		login: (login) => dispatch(AuthRedux.loginRequest(login))
	};
};

export default connect(null, mapDispatchToProps)(LoginContainer);
