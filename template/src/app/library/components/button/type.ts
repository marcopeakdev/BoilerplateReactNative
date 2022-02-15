import {Colors} from '@theme';
import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {ButtonPresetNames} from './preset';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Using text instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Preset for button
   * @default default
   */
  preset?: ButtonPresetNames;

  /**
   * Using color for text
   * @default undefined
   */
  textColor?: string;

  /**
   * Overwrite background color with theme for text
   */
  textColorTheme?: keyof Colors;

  /**
   * Using color for button background color
   * @default undefined
   */
  buttonColor?: string;

  /**
   * Overwrite button background with theme
   * @default undefined
   */
  buttonColorTheme?: keyof Colors;

  /**
   * Children for button
   * @default undefined
   */
  children?: React.ReactNode;
}
