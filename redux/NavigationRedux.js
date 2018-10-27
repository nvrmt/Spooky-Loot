import {RootNavigator} from '../navigation/AppNavigation'

export const reducer = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};
