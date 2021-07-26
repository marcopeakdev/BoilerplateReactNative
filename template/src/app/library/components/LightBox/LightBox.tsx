import React, {memo, useCallback, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import FastImage, {OnLoadEvent, Source} from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {Button} from '../Button/Button';

import {imageTransitionRef} from './ImageTransition';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

interface LightBoxProps {
  source: Source | number;
}

export type Measure = {
  x: number;
  y: number;
  width: number;
  height: number;
  px: number;
  py: number;
  targetHeight: number;
  targetWidth: number;
  imageOpacity: Animated.SharedValue<number>;
};

const LightBoxComponent = ({source}: LightBoxProps) => {
  // state
  const _refRoot = useRef<View>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [sizeImage, setSizeImage] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });
  const {width: widthDevice} = useWindowDimensions();
  const imageOpacity = useSharedValue(1);

  // function
  const _onImagePress = useCallback(() => {
    _refRoot.current?.measure((x, y, width, height, px, py) => {
      const targetWidth = widthDevice;
      const scaleFactor = widthDevice / sizeImage.width;
      const targetHeight = sizeImage.height * scaleFactor;
      imageTransitionRef.current?.show({
        image: {
          x,
          y,
          width,
          height,
          px,
          py,
          targetWidth,
          targetHeight,
          imageOpacity,
        },
        source,
      });
    });
  }, [widthDevice, imageOpacity, sizeImage, source]);

  const _onLoadedImage = useCallback((e: OnLoadEvent) => {
    setDisableButton(false);
    setSizeImage(e.nativeEvent);
    console.log('object', e.nativeEvent);
  }, []);

  //reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    opacity: imageOpacity.value,
  }));

  // render
  return (
    <>
      <View ref={_refRoot} collapsable={false} style={[styles.container]}>
        <Button disabled={disableButton} onPress={_onImagePress}>
          <Animated.View style={imageStyle}>
            <FastImage
              onLoad={_onLoadedImage}
              style={[styles.img]}
              source={source}
              resizeMode={'contain'}
            />
          </Animated.View>
        </Button>
      </View>
    </>
  );
};

export const LightBox = memo(LightBoxComponent, isEqual);
