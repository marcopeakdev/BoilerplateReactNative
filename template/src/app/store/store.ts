import {subscribeActionMiddleware} from '@common';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import {allReducer} from './allReducers';
import {rootSaga} from './rootSagas';
/**
 * Use this instead storage of reduxPersist
 *
 */
// import {persistStore, persistReducer} from 'redux-persist';
//  import {reduxPersistStorage} from '@utils';
// const persistedReducer = persistReducer(
//   {key: 'root', storage: reduxPersistStorage},
//   allReducer,
// );
const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, subscribeActionMiddleware];
if (devMode) {
  middleware.push(logger);
}
const storeConfig = () => {
  const store = configureStore({
    reducer: allReducer,
    devTools: devMode,
    middleware,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
export const store = storeConfig();
// export const persistore = persistStore(store);
