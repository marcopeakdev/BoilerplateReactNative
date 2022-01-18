import {isIos, CustomOmit} from '@common';
import {useEffect} from 'react';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import {hexStringFromCSSColor} from '../string';

const {AppModule} = NativeModules;

export const getVersion = (): string => {
  return AppModule.getVersion();
};
export const getAppName = (): string => {
  return AppModule.getAppName();
};
export const getDeviceId = (): string => {
  return AppModule.getDeviceId();
};
export const setAppBadges = (count: number) => {
  if (typeof count !== 'number' || !isIos) {
    return;
  }
  AppModule.setBadges(count);
};
export const clearNotification = () => {
  AppModule.clearNotification();
};
export const clearCache = () => {
  AppModule.clearCache();
};
export const checkChannelExist = (channelId: string) => {
  return new Promise<boolean>(rs => {
    if (isIos) {
      rs(false);
    }
    AppModule.checkChannelExist(channelId).then((res: boolean) => {
      rs(res);
    });
  });
};

export const deleteChannel = (channelId: string) => {
  if (isIos) {
    return;
  }
  AppModule.deleteChannel(channelId);
};

const ImportanceChannel = {
  DEFAULT: 3,
  HIGH: 4,
  MAX: 5,
  LOW: 2,
  MIN: 1,
  NONE: 0,
  UNSPECIFIED: -1000,
};

type Channel = {
  channelId: string;
  channelName: string;
  channelDescription?: string;
  playSound?: boolean;
  soundName?: string;
  importance?: keyof typeof ImportanceChannel;
  vibrate?: boolean;
};
export const createChannel = (channel: Channel) => {
  const actualChannel: CustomOmit<Channel, 'importance'> & {
    importance?: number;
  } = {
    ...channel,
    vibrate: channel?.vibrate ?? true,
    importance: channel.importance
      ? ImportanceChannel[channel.importance] ?? ImportanceChannel.HIGH
      : undefined,
  };
  return new Promise<boolean>(rs => {
    if (isIos) {
      rs(false);
    }
    AppModule.createChannel(actualChannel).then((res: boolean) => {
      rs(res);
    });
  });
};
export const getBuildNumber = (): string => {
  return AppModule.getBuildNumber();
};
export const registerPhotosChanges = () => {
  if (isIos) {
    AppModule.registerPhotosChanges();
  }
};

type Image = {
  uri: string;
  width?: number;
  height?: number;
};
type ImageResponse = {
  uri: string;
  name: string;
};
export const fixRotation = ({uri, height = 800, width = 600}: Image) => {
  return new Promise<ImageResponse>(rs => {
    if (isIos) {
      AppModule.fixRotation(
        uri,
        width,
        height,
        (_?: string, res?: ImageResponse) => {
          if (res) {
            rs({uri: res.uri, name: res.name});
          } else {
            rs({uri: uri, name: 'new_image.png'});
          }
        },
      );
    } else {
      AppModule.fixRotation(uri, width, height, rs, () => {
        rs({uri: uri, name: 'new_image.png'});
      });
    }
  });
};

export const usePhotosPermissionChange = (callback: () => void) => {
  // effect
  useEffect(() => {
    let photosChangeEvent: NativeEventEmitter,
      subscription: EmitterSubscription;
    if (isIos) {
      photosChangeEvent = new NativeEventEmitter(AppModule);
      subscription = photosChangeEvent.addListener('PhotosChange', callback);
    }
    return () => {
      if (isIos) {
        photosChangeEvent.removeSubscription(subscription);
      }
    };
  }, [callback]);

  return null;
};
export type MMKVOption = {
  id: string;
  cryptKey: string;
};
export const MMKVStorage = {
  setString: async (key: string, value: string, option?: MMKVOption) => {
    const res: boolean = await AppModule.mmkvSetString(
      key,
      value,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  setNumber: async (key: string, value: number, option?: MMKVOption) => {
    const res: boolean = await AppModule.mmkvSetNumber(
      key,
      value,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  setBoolean: async (key: string, value: boolean, option?: MMKVOption) => {
    const res: boolean = await AppModule.mmkvSetBoolean(
      key,
      value,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  getString: async (key: string, option?: MMKVOption) => {
    const res: string | null = await AppModule.mmkvGetString(
      key,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  getNumber: async (key: string, option?: MMKVOption) => {
    const res: number = await AppModule.mmkvGetNumber(
      key,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  getBoolean: async (key: string, option?: MMKVOption) => {
    const res: boolean = await AppModule.mmkvGetBoolean(
      key,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  getAllKeys: async (option?: MMKVOption) => {
    const res: Array<string> = await AppModule.mmkvGetAllKeys(
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  clearAll: async (option?: MMKVOption) => {
    const res: Array<string> = await AppModule.mmkvClearAll(
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
  delete: async (key: string, option?: MMKVOption) => {
    const res: boolean = await AppModule.mmkvDelete(
      key,
      option?.id ?? undefined,
      option?.cryptKey ?? undefined,
    );
    return res;
  },
};

export const setEnableIQKeyboard = (enable: boolean) => {
  if (!isIos) {
    return;
  }
  AppModule.setIQKeyboardOption({enable});
};

export const setIQKeyboardOption = (options: {
  enable?: boolean;
  layoutIfNeededOnUpdate?: boolean;
  enableDebugging?: boolean;
  keyboardDistanceFromTextField?: number;
  enableAutoToolbar?: boolean;
  toolbarDoneBarButtonItemText?: string;
  toolbarManageBehaviourBy?: 'subviews' | 'tag' | 'position';
  toolbarPreviousNextButtonEnable?: boolean;
  toolbarTintColor?: string;
  toolbarBarTintColor?: string;
  shouldShowToolbarPlaceholder?: boolean;
  overrideKeyboardAppearance?: boolean;
  keyboardAppearance?: 'default' | 'light' | 'dark';
  shouldResignOnTouchOutside?: boolean;
  shouldPlayInputClicks?: boolean;
  resignFirstResponder?: boolean;
  reloadLayoutIfNeeded?: boolean;
}) => {
  if (!isIos) {
    return;
  }
  const actualOption = {...options};
  if (options.toolbarBarTintColor) {
    actualOption.toolbarBarTintColor = hexStringFromCSSColor(
      options.toolbarBarTintColor,
    );
  }
  if (options.toolbarTintColor) {
    actualOption.toolbarTintColor = hexStringFromCSSColor(
      options.toolbarTintColor,
    );
  }
  AppModule.setIQKeyboardOption(actualOption);
};
