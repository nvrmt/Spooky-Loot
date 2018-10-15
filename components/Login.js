import React from 'react';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

import { StyleSheet, Button, View, Text } from 'react-native';
import AuthRedux, {isUserAuthenticated} from "../redux/AuthRedux";
import { connect } from 'react-redux';

class Login extends React.Component {
    onLogin() {
        this.firebaseAuth();
    }

//TODO: turn this into a saga
    async firebaseAuth() {
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                return;
            }

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
            }

            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            let jsonData = JSON.stringify(currentUser.user.toJSON());
            let info = JSON.parse(jsonData);

            this.props.checkAuth();

        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return <Button
            onPress={ () => this.onLogin() }
            title="Connect with Facebook"
            color="#FF5E00"/>;
    }
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(AuthRedux.authCheck())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);