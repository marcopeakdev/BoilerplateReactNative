/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from 'react';
import {
  StyleSheet,
  TextInput,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useInterpolate, useSharedTransition} from '@animated';
import {useTranslation} from 'react-i18next';
import {enhance, onCheckType} from '@common';
import {Block} from '@library/components/Block/Block';

import {InputFlatProps} from './InputFlat.props';

const VERTICAL_PADDING = 5;
const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

const styles = StyleSheet.create({
  container: {
    paddingVertical: VERTICAL_PADDING,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'gray',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    color: '#000',
    padding: 0,
    marginTop: 10,
    borderBottomColor: 'transparent',
  },
  text: {
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 2,
  },
  wrapLabel: {
    position: 'absolute',
    left: 0,
  },
});

export const InputFlat = forwardRef<any, InputFlatProps>((props, ref) => {
  // props
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    placeholderColor,
    onTextChange,
    trigger,
    nameTrigger,
    inputStyle = {},
    name = '',
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    disabled = false,
    error = undefined,
    rightChildren = undefined,
    containerStyle = {},
    onChangeText,
    onFocus,
    onBlur,
    ...rest
  } = props;

  // state
  const [t] = useTranslation();
  const [sizeContainer, setSizeContainer] = useState({height: 0});
  const [sizeText, setSizeText] = useState({height: 0});
  const [focused, setFocused] = useState(false);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const top = useInterpolate(
    progress,
    [0, 1],
    [sizeContainer.height / 2 - sizeText.height / 2 - VERTICAL_PADDING / 4, 0],
  );

  const fontLabel = useInterpolate(progress, [0, 1], [14, 12]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  });

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  });

  // function
  const _onLayoutContainer = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeContainer({...sizeContainer, height: e.nativeEvent.layout.height});
    },
    [sizeContainer],
  );

  const onLayoutText = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeText({...sizeText, height: e.nativeEvent.layout.height});
    },
    [sizeText],
  );

  const _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onFocus && onCheckType(onFocus, 'function')) {
        onFocus(e);
      }
      setFocused(true);
    },
    [onFocus],
  );

  const _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onBlur && onCheckType(onBlur, 'function')) {
        onBlur(e);
      }
      setFocused(false);
    },
    [onBlur],
  );

  const _onChangeText = useCallback(
    (text: string) => {
      if (onTextChange && onCheckType(onTextChange, 'function')) {
        onTextChange(name, value);
      }
      if (onChangeText && onCheckType(onChangeText, 'function')) {
        onChangeText(text);
      }
      if (
        trigger &&
        onCheckType(trigger, 'function') &&
        nameTrigger &&
        onCheckType(nameTrigger, 'string')
      ) {
        setTimeout(() => {
          trigger(nameTrigger);
        }, 0);
      }
      setValue(text);
    },
    [name, nameTrigger, onChangeText, onTextChange, trigger, value],
  );

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // style
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t],
  );

  const placeHolder = useMemo(
    () => (placeholderTx && t(placeholderTx)) || placeholder || '',
    [placeholder, placeholderTx, t],
  );

  const inputSty = useMemo(() => enhance([styles.input, inputStyle]), [
    inputStyle,
  ]);

  const containerSty = useMemo(
    () => enhance([styles.container, containerStyle]),
    [containerStyle],
  );

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    top: top.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    color: labelColor.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  // render
  return (
    <Animated.View
      onLayout={_onLayoutContainer}
      style={[containerSty, containerAnimatedStyle]}>
      <Block direction={'row'}>
        <TextInput
          defaultValue={localDefaultValue}
          autoCorrect={false}
          placeholder={focused === true ? placeHolder : ''}
          placeholderTextColor={placeholderColor ?? undefined}
          selectionColor={activeTintBorderColor}
          underlineColorAndroid={'transparent'}
          clearButtonMode={'always'}
          editable={!disabled}
          style={inputSty}
          ref={ref}
          {...rest}
          onChangeText={_onChangeText}
          onFocus={_onFocus}
          onBlur={_onBlur}
        />
        {rightChildren}
      </Block>
      {labelText && (
        <Animated.View
          pointerEvents={'none'}
          style={[styles.wrapLabel, wrapLabelStyle]}>
          <Animated.Text
            onLayout={onLayoutText}
            style={[styles.text, labelStyle]}>
            {labelText ?? ''}
          </Animated.Text>
        </Animated.View>
      )}
    </Animated.View>
  );
});
