// Packages
import { SagaIterator } from '@redux-saga/types';
import { all, fork } from 'redux-saga/effects';

// Sagas
import usersSaga from './users/sagas';

export default function* rootSaga(): SagaIterator {
  yield all([fork(usersSaga)]);
}
