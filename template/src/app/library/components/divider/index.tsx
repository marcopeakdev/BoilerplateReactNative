import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {View, ViewStyle} from 'react-native';

import {DividerProps} from './type';

const DividerComponent = (props: DividerProps) => {
  // state
  const {height = 1, colorTheme, color = '#bbb'} = props;
  const theme = useTheme();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      width: '100%',
      height,
      backgroundColor: colorTheme ? theme.colors[colorTheme] : color,
    }),
    [color, colorTheme, height, theme.colors],
  );

  // render
  return <View style={[divider]} />;
};
export const Divider = memo(DividerComponent, equals);
