/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {TextStyle, TextProps as TextProperties, StyleProp} from 'react-native';
import {FontSizeTypes} from '@theme/fontSize';
import {FontFamily} from '@theme/typography';
import {Colors} from '@config/type';

import {TextPresetNames} from './Text.presets';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;
type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export interface TextProps extends TextProperties {
  fontStyle?: 'normal' | 'italic';

  letterSpacing?: number;

  lineHeight?: number;

  /**
   * Children of text
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Option of i18n
   * @default undefined
   */
  txOptions?: any;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  flex?: boolean;

  /**
   * Overwrite font size
   * @default FONT_14
   */
  fontSize?: FontSizeTypes;

  /**
   * Overwrite font weight
   * @default undefined
   */
  fontWeight?: FontWeight;

  /**
   * Overwrite font family
   * @default undefined
   */
  fontFamily?: FontFamily;

  /**
   * Using color
   * @default undefined
   */
  color?: string;

  /**
   * Overwrite background color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Set true for using textAlign = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Overwrite textAlign
   * @default undefined
   */
  textAlign?: TextAlign;

  /**
   * Overwrite textTransform
   * @default undefined
   */
  textTransform?: TextTransform;

  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;
  /**
   * Preset for text
   * @default default
   */
  preset?: TextPresetNames;
}
