import {takeLatest} from 'redux-saga/effects';

import {onLoadApp} from '../app_redux/reducer';

import * as Saga from './saga';
export function* appSaga() {
  yield takeLatest(onLoadApp.type, Saga.onLoadAppModeAndTheme);
}
