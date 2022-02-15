import {useSharedTransition} from '@animated';
import {useAsyncState, useMounted} from '@common';
import React, {memo, useState} from 'react';
import equals from 'react-fast-compare';
import {StyleSheet, View} from 'react-native';
import {Blurhash} from 'react-native-blurhash';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {styles} from './styles';
import {ImageRemoteProps} from './type';

const ImageRemoteComponent = ({
  style: styleOverride = {},
  source,
  blurHashOnLoad = 'L9AB*A%LPqys8_H=yDR5nMMeVXR5',
  thumbBlurHash,
  resizeMode = 'cover',
  containerStyle,
  childrenError,
  childrenOnload,
  ...rest
}: ImageRemoteProps) => {
  // state

  const [loadSucceeded, setLoadSucceeded] = useState<boolean>(false);
  const [loadThumbSucceeded, setLoadThumbSucceeded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const opacityImg = useSharedTransition(loadSucceeded);
  const opacityBlur = useSharedTransition(loadThumbSucceeded);
  const opacityOnLoad = useSharedTransition(!loadThumbSucceeded);

  // function
  const _onLoadImageStart = () => {
    setError(false);
  };

  const _onLoadThumbSucceeded = () => {
    setLoadThumbSucceeded(true);
  };

  const _onLoadImageSucceeded = () => {
    setError(false);
    setLoadSucceeded(true);
  };

  const _onLoadError = () => {
    setError(true);
  };

  // reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    opacity: opacityImg.value,
  }));

  const imageOnloadStyle = useAnimatedStyle(() => ({
    opacity: opacityOnLoad.value,
  }));
  const imageBlurStyle = useAnimatedStyle(() => ({
    opacity: opacityBlur.value,
  }));

  // render
  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.viewOnLoad, imageOnloadStyle]}>
        {childrenOnload || (
          <Blurhash
            blurhash={blurHashOnLoad}
            style={[StyleSheet.absoluteFillObject]}
          />
        )}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageBlurStyle]}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}>
          {thumbBlurHash !== undefined && (
            <Blurhash
              onLoadEnd={_onLoadThumbSucceeded}
              blurhash={thumbBlurHash ?? ''}
              style={[StyleSheet.absoluteFillObject]}
            />
          )}
        </Animated.View>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
        <FastImage
          onLoadStart={_onLoadImageStart}
          resizeMode={resizeMode}
          onError={_onLoadError}
          onLoad={_onLoadImageSucceeded}
          style={[styles.img, styleOverride]}
          source={{uri: source}}
          {...rest}
        />
      </Animated.View>
      {error && (
        <Animated.View style={[styles.viewError]}>
          {childrenError}
        </Animated.View>
      )}
    </View>
  );
};
export const ImageRemote = memo((props: ImageRemoteProps) => {
  const [isChange, setIsChange] = useAsyncState<boolean>(false);

  useMounted(() => {
    setIsChange(true, () => {
      setIsChange(false);
    });
  }, [props.source]);

  return isChange ? null : <ImageRemoteComponent {...props} />;
}, equals);
