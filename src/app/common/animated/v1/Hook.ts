import Animated from 'react-native-reanimated';
import {useRef} from 'react';

import {
  onGestureEvent,
  panGestureHandler,
  pinchGestureHandler,
  rotationGestureHandler,
  tapGestureHandler,
  scrollHandler,
} from './Gesture';
import {vec} from './Vectors';
import {loop} from './RunningAnimated';

const {Clock, Value, diff, set, useCode, debug, block} = Animated;

export const useConst = <T>(initialValue: T | (() => T)): T => {
  const ref = useRef<{value: T}>();
  if (ref.current === undefined) {
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
};

export const useGestureHandler = (
  nativeEvent: Parameters<typeof onGestureEvent>[0],
) => useConst(() => onGestureEvent(nativeEvent));

export const usePanGestureHandler = () => useConst(() => panGestureHandler());

export const useRotationGestureHandler = () =>
  useConst(() => rotationGestureHandler());

export const usePinchGestureHandler = () =>
  useConst(() => pinchGestureHandler());

export const useTapGestureHandler = () => useConst(() => tapGestureHandler());

export const useScrollHandler = () => useConst(() => scrollHandler());

type Atomic = string | number | boolean;

export const useVector = (
  ...defaultValues: Parameters<typeof vec.createValue>
) => useConst(() => vec.createValue(...defaultValues));

export const useClock = () => useConst(() => new Clock());

export const useValue = <V extends Atomic>(value: V) =>
  useConst(() => new Value(value));

export const useLoop = (duration = 1000, boomerang = true) => {
  const progress = useValue(0);
  useCode(() => set(progress, loop({duration, boomerang})), [progress]);
  return progress;
};

type UseValues = {
  <V extends Atomic>(v: V): [Animated.Value<V>];
  <V1 extends Atomic, V2 extends Atomic>(v1: V1, v2: V2): [
    Animated.Value<V1>,
    Animated.Value<V2>,
  ];
  <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic>(
    v1: V1,
    v2: V2,
    v3: V3,
  ): [Animated.Value<V1>, Animated.Value<V2>, Animated.Value<V3>];
  <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic, V4 extends Atomic>(
    v1: V1,
    v2: V2,
    v3: V3,
    v4: V4,
  ): [
    Animated.Value<V1>,
    Animated.Value<V2>,
    Animated.Value<V3>,
    Animated.Value<V4>,
  ];
  <
    V1 extends Atomic,
    V2 extends Atomic,
    V3 extends Atomic,
    V4 extends Atomic,
    V5 extends Atomic
  >(
    v1: V1,
    v2: V2,
    v3: V3,
    v4: V4,
    v5: V5,
  ): [
    Animated.Value<V1>,
    Animated.Value<V2>,
    Animated.Value<V3>,
    Animated.Value<V4>,
    Animated.Value<V5>,
  ];
  <V extends Atomic>(...values: V[]): Animated.Value<V>[];
};

export const useValues = ((<V extends Atomic>(...values: [V, ...V[]]) =>
  useConst(() => values.map(v => new Value(v)))) as unknown) as UseValues;

export const useDiff = (node: Animated.Node<number>) => {
  const dDiff = useValue(0);
  useCode(() => set(dDiff, diff(node)), [dDiff, node]);
  return dDiff;
};
