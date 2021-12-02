import {
  DEV_MODE_API,
  PROD_MODE_API,
  STAGING_MODE_API,
  AppModeType,
} from '@networking/api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';
import {ThemeType} from '@theme';

import {AppState} from './type';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: undefined,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  theme: 'default',
  appMode: 'dev',
  appUrl: DEV_MODE_API,
};
const appModeToURL = (mode: AppModeType): string => {
  switch (mode) {
    case 'dev':
      return DEV_MODE_API;
    case 'prod':
      return PROD_MODE_API;
    case 'staging':
      return STAGING_MODE_API;
    default:
      return DEV_MODE_API;
  }
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state, {payload}: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    onSetToken: (state, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },
    onSetAppProfile: (state, {payload}: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    onSetAppTheme: (state, {payload}: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    onLoadApp: state => {
      state.loadingApp = true;
    },
    onLoadAppEnd: state => {
      state.loadingApp = false;
    },
    onStartProcess: state => {
      state.showDialog = true;
    },
    onEndProcess: state => {
      state.showDialog = false;
    },
    onSetAppMode: (state, {payload}: PayloadAction<AppModeType>) => {
      const appURL = appModeToURL(payload);
      state.appUrl = appURL;
      state.appMode = payload;
    },
    onLogout: state => {
      state.token = undefined;
      state.profile = {};
    },
  },
});
export const appReducer = appSlice.reducer;
export const {
  onLogout,
  onStartProcess,
  onEndProcess,
  onLoadApp,
  onLoadAppEnd,
  onSetAppMode,
  onSetAppProfile,
  onSetAppTheme,
  onSetInternet,
  onSetToken,
} = appSlice.actions;
