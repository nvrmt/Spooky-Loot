// InitialContainer
// Login / Register will be handled here, along with checking for app updates (NOT content)

import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import AuthOperations from '../operations/AuthOperations';
import VersionOperations from '../operations/UpdaterOperations';

//Components
import Login from "../components/Login";
import Logo from "../components/Logo";

//Containers
import HubContainer from './HubContainer';

class InitialContainer extends React.Component {
    constructor(props) {
        super(props);

        this.props.checkAuth();
    }

    moveToHub() {
        this.props.navigation.navigate('Hub');
    }

    render() {
        return (<View style={styles.container}>
                    <Logo/>
                    <Login store={this.props.store} navigation={this.props.navigation}/>
                </View>)
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
        authorized: state.authorization.authorized,
        checking: state.authorization.checking
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(AuthOperations.authCheck())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialContainer);