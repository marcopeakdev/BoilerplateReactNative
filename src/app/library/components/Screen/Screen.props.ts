import {ViewStyle, StyleProp} from 'react-native';
import {Edge} from 'react-native-safe-area-context';

export interface ScreenProps {
  /**
   * Children of Screen
   */
  children?: React.ReactNode;

  /**
   * Overwrite style of screen
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Color of Screen
   * @default transparent
   */
  backgroundColor?: string;

  /**
   * Status bar style
   * @default dark-content
   */
  statusBar?: 'light-content' | 'dark-content';

  /**
   * Using safe area on ios
   * @default false
   */
  unsafe?: boolean;

  /**
   * Visibility status bar
   * @default true
   */
  hidden?: boolean;

  /**
   * Color of status bar for both Android/IOS
   */
  statusColor?: string;

  /**
   * Enable to draw behind status bar android
   * @default false
   */
  draw?: boolean;

  /**
   * Enable to custom background color of inset bottom on Iphone
   * @default false
   */
  customInsetBottom?: boolean;

  /**
   * Color of inset bottom IPhone when customInsetBottom set to true
   * @default #ffffff
   */
  bottomIPXColor?: string;

  outer0?: ViewStyle;

  /**
   * Show vertical indicator or not (using when scroll equal true)
   * @default false
   */
  showVertical?: boolean;

  /**
   * Show horizontal indicator or not (using when scroll equal true)
   * @default false
   */
  showHorizontal?: boolean;

  /**
   * Using scroll content
   * @default false
   */
  scroll?: boolean;

  /**
   * Inset for safe area view
   * @default undefined
   */
  forceInset?: Edge[];
}
