import AuthSaga from './AuthSaga';
import UpdaterSaga from './UpdaterSaga';
import {fork, all} from "redux-saga/effects";

export default function* root() {
    yield all(
        [
            fork(UpdaterSaga),
            fork(AuthSaga),
        ]
    )
}