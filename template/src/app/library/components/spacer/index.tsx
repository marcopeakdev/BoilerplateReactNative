import {sizeScale} from '@common';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {View} from 'react-native';

import {SpacerProps} from './type';

const SpacerComponent = (props: SpacerProps) => {
  const {height = 0, width = 0} = props;

  // style
  const actualStyle = useMemo(
    () => ({
      width: typeof width === 'number' ? sizeScale(width) : width,
      height: typeof height === 'number' ? sizeScale(height) : height,
    }),
    [height, width],
  );

  // render
  return <View style={actualStyle} />;
};
export const Spacer = memo(SpacerComponent, equals);
