// Packages
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

// Services
import { fetchUsers } from "./api";

// Actions
import { getUsersSuccess } from "./actions";
import { GET_USERS } from "./actionTypes";

function* getUsersSaga(): SagaIterator<void> {
    try {
        const data = yield call(fetchUsers);
        yield put(getUsersSuccess(data.results));
    } catch (error) {
        console.log('ERRROR', error)
    }
}

export default function* usersSaga() {
    yield all([takeEvery(GET_USERS, getUsersSaga)]);
}

