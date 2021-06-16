// Packages
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

// Services
import { fetchUsers } from "./api";

// Actions
import { getUsersSuccess } from "./actions";
import { GET_USERS, GET_LOCAL_USERS } from "./actionTypes";

function* getUsersSaga(): SagaIterator<void> {
    try {
        const data = yield call(fetchUsers);
        yield put(getUsersSuccess(data.results));
        localStorage.setItem('users', JSON.stringify(data.results))
    } catch (error) {
        console.log('ERRROR', error)
    }
}


function* getPersistedUsersSaga() {
    try {
        let users = localStorage.getItem('users')
        if (users) {
            users = JSON.parse(users)
            yield put(getUsersSuccess(users));
        }
    } catch (error) {
        console.log('ERRROR', error)
    }
}
export default function* usersSaga() {
    yield all([takeEvery(GET_USERS, getUsersSaga)]);
    yield all([takeEvery(GET_LOCAL_USERS, getPersistedUsersSaga)]);
}

