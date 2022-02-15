import {enhance} from '@common';
import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {Text} from '../text';

import {stylesText, stylesView} from './preset';
import {ButtonProps} from './type';

const ButtonComponent = (props: ButtonProps) => {
  // state
  const {
    preset = 'default',
    textColor,
    textColorTheme,
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    buttonColor,
    buttonColorTheme,
    ...rest
  } = props;
  const theme = useTheme();

  // style
  const viewStyle = useMemo(
    () =>
      enhance<ViewStyle>([
        stylesView[preset],
        {
          backgroundColor: buttonColorTheme
            ? theme.colors[buttonColorTheme]
            : buttonColor,
        },

        styleOverride as ViewStyle,
      ]),
    [buttonColor, buttonColorTheme, preset, styleOverride, theme.colors],
  );

  // render
  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {children || (
        <Text
          tx={tx}
          text={text}
          style={[stylesText[preset], textStyleOverride]}
          color={textColor}
          colorTheme={textColorTheme}
        />
      )}
    </TouchableOpacity>
  );
};
export const Button = memo(ButtonComponent, equals);
