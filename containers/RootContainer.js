import React from 'react';
import {connect} from 'react-redux';

import ReduxNavigation from '../navigation/ReduxNavigation'
import InitRedux, {isUpdated} from "../redux/StartupRedux";


class RootContainer extends React.Component {
    componentDidMount() {
       this.props.startAppInit();
    }

    render() {
        return (<ReduxNavigation />)
    }
}

const mapStateToProps = (state) => {
    return {
        isUpdated: isUpdated(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAppInit: (payload : Object) => dispatch(InitRedux.startupRequest(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
