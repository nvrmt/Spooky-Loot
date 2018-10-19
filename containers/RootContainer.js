import React from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';

import ReduxNavigation from '../navigation/ReduxNavigation'
import InitRedux from "../redux/StartupRedux";

import {DefaultStyles} from '../styles';


class RootContainer extends React.Component {
    componentDidMount() {
       this.props.startAppInit();
    }

    render() {
        return (
            <View style={DefaultStyles.container}>
                <ReduxNavigation />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAppInit: (payload : Object) => dispatch(InitRedux.startupRequest(payload)),
    }
};

export default connect(null, mapDispatchToProps)(RootContainer);
