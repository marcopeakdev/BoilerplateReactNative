import {useDisableBackHandler, useDismissKeyboard} from '@common';
import {useTheme} from '@theme';
import React, {
  createRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {ActivityIndicator, View} from 'react-native';

import {styles} from './styles';

const Spinner = memo(() => {
  // state
  const theme = useTheme();
  // render
  return <ActivityIndicator color={theme.colors.background} size={'large'} />;
}, isEqual);

const ProgressDialogComponent = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState(false);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );

  useDisableBackHandler(visible);

  useDismissKeyboard(visible);

  // render
  return visible ? (
    <>
      <View style={[styles.container]}>
        <Spinner />
      </View>
    </>
  ) : null;
});

export const progressDialogRef = createRef<ProgressDialogRef>();
export const ProgressDialog = memo(
  () => <ProgressDialogComponent ref={progressDialogRef} />,
  isEqual,
);
export const showLoading = () => {
  progressDialogRef.current?.show();
};

export const hideLoading = () => {
  progressDialogRef.current?.hide();
};
export interface ProgressDialogRef {
  show(): void;
  hide(): void;
}
