// InitialContainer
// Login / Register will be handled here, along with checking for app updates (NOT content)

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import AuthOperations from '../operations/AuthOperations';
import VersionOperations from '../operations/UpdaterOperations';

//Components
import Auth from "../components/Auth";
import Logo from "../components/Logo";

//Containers
import HubContainer from './HubContainer';

class InitialContainer extends React.Component {
    constructor(props) {
        super(props);
        //this.props.checkAuth();
    }
    componentDidMount() {
        console.log(this.props.authorized);
        //this.props.navigation.navigate("Hub");
    }



    render() {
        return (
            (this.props.authorized) ? null
                : // else
            (<View style={styles.container}>
                <Logo />
                <Auth store={this.props.store} navigation={this.props.navigation}/>
            </View>))
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#81a0cc',
      alignItems: 'center',
      justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
    return {
      authorized: state.authorization.authorized
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (username, password) => dispatch(AuthOperations.loginRequest(username, password)),
        checkAuth: () => dispatch(AuthOperations.authCheck())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialContainer);