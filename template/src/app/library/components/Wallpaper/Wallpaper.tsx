import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {enhance} from '@common';
import {useWindowDimensions, StyleProp} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

import {Img} from '../Image/Image';

import {WallpaperProps} from './Wallpaper.props';
import {presets} from './Wallpaper.presets';

const WallpaperComponent = ({
  preset = 'stretch',
  style: styleOverride,
  backgroundImage = 'bg_wallpaper',
}: WallpaperProps) => {
  // state
  const {height, width} = useWindowDimensions();
  const presetToUse = presets[preset];

  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () => enhance([presetToUse, {width, height}, styleOverride]),
    [presetToUse, width, height, styleOverride],
  );

  // render
  return (
    <Img
      containerStyle={presets[preset]}
      source={backgroundImage}
      style={style}
    />
  );
};
export const Wallpaper = memo(WallpaperComponent, equals);
