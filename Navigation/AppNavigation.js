import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

//Screens
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const RootNavigator = createStackNavigator({
    Splash: { screen: SplashScreen },
    Auth: { screen: AuthScreen },
    Home: { screen: HomeScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Splash',
  navigationOptions: {
    headerStyle: null
  }
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };