import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  useSharedTransition,
  useInterpolate,
  useInterpolateColor,
} from '@animated';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import equals from 'react-fast-compare';
import {onCheckType} from '@common';

import {RadioButtonProps} from './RadioButton.props';

const SIZE = 30;
const ACTIVE_COLOR = '#ff00a9';
const UN_ACTIVE_COLOR = '#999999';
const STROKE_WIDTH = 3;
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

const RadioButtonComponent = (props: RadioButtonProps) => {
  // state
  const {
    initialValue = false,
    activeColor = ACTIVE_COLOR,
    unActiveColor = UN_ACTIVE_COLOR,
    strokeWidth = STROKE_WIDTH,
    sizeDot = SIZE - 10,
    value,
    onToggle,
  } = props;
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue, {duration: 200});
  const size = useInterpolate(progress, [0, 1], [0, sizeDot - strokeWidth]);
  const color = useInterpolateColor(
    progress,
    [0, 1],
    [unActiveColor, activeColor],
  );

  // function
  const _onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!value);
      }
    } else {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!localValue);
      }
      setLocalValue(v => !v);
    }
  }, [localValue, onToggle, value]);

  // style
  const wrapStyle = useMemo(
    () => ({
      width: sizeDot + 10,
      height: sizeDot + 10,
      borderRadius: (sizeDot + 10) / 2,
      borderWidth: strokeWidth,
    }),
    [sizeDot, strokeWidth],
  );

  // reanimated style
  const wrapAnimaStyle = useAnimatedStyle(() => ({
    borderColor: color.value as string,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: (sizeDot - strokeWidth) / 2,
    backgroundColor: color.value as string,
  }));

  // render
  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <Animated.View style={[styles.wrap, wrapStyle, wrapAnimaStyle]}>
        <Animated.View pointerEvents={'none'} style={[styles.dot, dotStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const RadioButton = memo(RadioButtonComponent, equals);
