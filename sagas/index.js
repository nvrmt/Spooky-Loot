import AuthSaga from './AuthSaga';
import UpdaterSaga from './UpdaterSaga';
import InitSaga from './StartupSaga';
import {fork, all} from "redux-saga/effects";

export default function* root() {
    yield all(
        [
            fork(InitSaga),
            fork(UpdaterSaga),
            fork(AuthSaga),
        ]
    )
}