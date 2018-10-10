import React from 'react';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

import { StyleSheet, Button, View, Text } from 'react-native';
import AuthOperations from "../operations/AuthOperations";
import { connect } from 'react-redux';

class Auth extends React.Component {
    componentDidMount() {
        this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
            } else {
                console.log("No auth change");
            }
        });
    }

    componentWillUnmount() {
        this.firebaseUnsubscribe();
    }

    onLoginFinish(error, results) {
        if (error) {
            console.log("login has error: " + results.error);
        } else if (results.isCancelled) {
            console.log("login is cancelled.");
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    this.firebaseAuth(data.accessToken);
                }
            )
        }
    }

    onLogoutFinish(error, results) {

    }

    async firebaseAuth(accessToken) {
        try {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            let jsonData = JSON.stringify(currentUser.user.toJSON());
            console.info(jsonData);

            let info = JSON.parse(jsonData);
            console.log("Welcome " + info.displayName);

        } catch (e) {
            this.props.navigation.navigate('Initial');
            console.error(e);
        }
    }

    render() {
        return <LoginButton
            onLoginFinished={ (error, results) => this.onLoginFinish(error, results) }
            onLogoutFinished={ (error, results) => this.onLogoutFinish(error, results) }
            title="Login"
            color="#FF5E00"/>;
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(AuthOperations.authCheck())
    }
};


export default connect(mapStateToProps)(Auth);