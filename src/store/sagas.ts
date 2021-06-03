import { all, fork } from 'redux-saga/effects';
import usersSaga from './users/sagas';

export default function* rootSaga() {
  yield all([fork(usersSaga)]);
}