import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Login} from '@features/unAuthentication/login/design';
import {Register} from '@features/unAuthentication/register/design';
import {clearCache} from '@common';

import {APP_SCREEN} from '../screenTypes';

const Stack = createStackNavigator();

export const UnAuthentication = () => {
  // effect
  useEffect(() => {
    // clean cache when logout
    clearCache();
  }, []);

  // render
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={Login} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER}
        component={Register}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};
