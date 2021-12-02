import {useMix, useSharedTransition} from '@animated';
import {enhance, onCheckType} from '@common';
import React, {useCallback, useMemo, useState} from 'react';
import equals from 'react-fast-compare';
import {TouchableOpacity, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {Text} from '../text';

import {styles} from './styles';
import {CheckboxProps} from './type';

const CheckBoxComponent = ({
  fillStyle,
  onToggle,
  outlineStyle: outlineStyleOverwrite,
  style,
  text,
  tx,
  disable = false,
  initialValue = false,
  value,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue);
  const scale = useMix(progress, 0, 1);
  const opacity = useMix(progress, 0, 1);

  // style
  const rootStyle = useMemo(() => enhance([styles.ROOT, style ?? {}]), [style]);

  const outlineStyle = useMemo(
    () => enhance([styles.OUTLINE, outlineStyleOverwrite ?? {}]),
    [outlineStyleOverwrite],
  );

  const _fillStyle = useMemo(
    () => enhance([styles.FILL, fillStyle ?? {}]),
    [fillStyle],
  );

  const _labelStyle = useMemo(() => styles.LABEL, []);

  // function
  const onPress = useCallback(() => {
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

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  // render
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disable}
      onPress={onPress}
      style={[rootStyle]}>
      <>
        <View style={[outlineStyle]}>
          <Animated.View style={[_fillStyle, styleAnimated]} />
        </View>
        <Text text={text} tx={tx} style={_labelStyle} />
      </>
    </TouchableOpacity>
  );
};
export const CheckBox = React.memo(CheckBoxComponent, equals);
