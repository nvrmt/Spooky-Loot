import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';


if(__DEV__) {
    Reactotron
        .configure({ name: 'SpookyLoot' })
        .useReactNative()
        .use(reduxPlugin({ onRestore: Immutable }))
        .use(sagaPlugin())
        .connect();

    Reactotron.clear();

    console.tron = Reactotron;
}
