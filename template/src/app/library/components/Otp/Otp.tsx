import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
  useRef,
} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {ColorDefault} from '@theme/color';
import {FontSizeDefault} from '@theme/fontSize';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {Block} from '../Block/Block';
import {Text} from '../Text/Text';
import {Spacer} from '../Spacer/Spacer';

import {OtpProps} from './Otp.props';

const WIDTH_OTP = 32;
const HEIGHT_OTP = 40;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: WIDTH_OTP,
    height: HEIGHT_OTP,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.border,
  },
  otpViewActive: {
    borderColor: ColorDefault.primary,
  },
  otpText: {
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
    textAlignVertical: 'bottom',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    // width: '100%',
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    height: HEIGHT_OTP,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    color: 'transparent',
    opacity: 0,
  },
});

const OtpComponent = (props: OtpProps) => {
  // state
  const {
    length,
    defaultOtp = '',
    onOtpValid,
    onOtpInValid,
    textEntry,
    wrapInputActiveStyle = {},
    wrapInputStyle = {},
    containerStyle = {},
    textStyle = {},
    ...rest
  } = props;
  const [otp, setOtp] = useState('');
  const _inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // function
  const _onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();
    if (textTrim.length <= length) {
      setOtp(text.trim().toString());
    }
  };

  const _setFocus = useCallback(() => {
    if (_inputRef.current) {
      _inputRef.current.focus();
    }
  }, [_inputRef]);

  const _onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const _onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // effect
  useEffect(() => {
    if (defaultOtp) {
      setOtp(
        defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp,
      );
    }
  }, [defaultOtp, length]);

  useEffect(() => {
    if (otp.length === length) {
      onOtpValid && onOtpValid();
    } else {
      onOtpInValid && onOtpInValid();
    }
  }, [length, onOtpInValid, onOtpValid, otp]);

  // style
  const container = useMemo(
    () => enhance([styles.wrap, styles.row, containerStyle]),
    [containerStyle],
  );
  const wrapInput = useMemo(
    () => enhance([styles.otpView, wrapInputStyle]),
    [wrapInputStyle],
  );
  const wrapInputActive = useMemo(
    () => enhance([styles.otpViewActive, wrapInputActiveStyle]),
    [wrapInputActiveStyle],
  );
  const text = useMemo(() => enhance([styles.otpText, textStyle]), [textStyle]);
  const input = useMemo(() => enhance([styles.input]), []);
  const row = useMemo(() => enhance([styles.row]), []);

  // render
  return (
    <TouchableWithoutFeedback onPress={_setFocus}>
      <Block block style={[container]}>
        <TextInput
          ref={_inputRef}
          value={otp}
          onFocus={_onFocus}
          onBlur={_onBlur}
          autoCapitalize={'none'}
          autoFocus={false}
          underlineColorAndroid={'transparent'}
          onChangeText={_onOtpChange}
          selectionColor={'transparent'}
          style={input}
          {...rest}
        />
        {length &&
          Array(length)
            .fill(0)
            .map((item, index) => {
              return (
                <Block key={index} style={row}>
                  <Block
                    style={[
                      wrapInput,
                      (index === otp.length ||
                        (length === otp.length && index === otp.length - 1)) &&
                        isFocused &&
                        wrapInputActive,
                    ]}>
                    <Text
                      text={
                        index <= otp.length - 1
                          ? textEntry?.charAt(0) ?? otp.charAt(index)
                          : ''
                      }
                      style={[text]}
                    />
                  </Block>
                  <Spacer width={15} />
                </Block>
              );
            })}
      </Block>
    </TouchableWithoutFeedback>
  );
};
export const Otp = memo(OtpComponent, equals);
