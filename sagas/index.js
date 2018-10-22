import AuthSaga from './AuthSaga';
import UpdaterSaga from './UpdaterSaga';
import StartupSaga from './StartupSaga';
import MapSaga from './MapSaga';
import {fork, all} from "redux-saga/effects";

export default function* root() {
    yield all(
        [
            fork(StartupSaga),
            fork(UpdaterSaga),
            fork(AuthSaga),
            fork(MapSaga),
        ]
    )
}