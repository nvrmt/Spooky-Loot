import React from 'react'
import {BackHandler, Platform} from 'react-native'
import {connect} from 'react-redux'
import { AppNavigator } from './AppNavigation';
import NavigationActions from "react-navigation/src/NavigationActions";

class ReduxNavigation extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0 || nav.index === 1) {
            return false;
        }

        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return <AppNavigator navigation={this.props.nav}/>;
    }
}

const mapStateToProps = state => ({nav: state.nav});
export default connect(mapStateToProps)(ReduxNavigation);
