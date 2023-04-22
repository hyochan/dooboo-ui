import type {ReactElement, ReactNode} from 'react';
// Caveat: Expo web needs React to be imported
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {useFonts} from 'expo-font';

import {
  DoobooProvider,
  LoadingIndicator,
  SwitchToggle,
  Typography,
  useDooboo,
} from '../main';

import {StoryContainer} from './GlobalStyles';

type ContainerProps = {
  children: ReactNode;
};

const fontConfig = {
  doobooui: require('../main/uis/Icon/doobooui.ttf'),
};

export function StoryWrapper({children}: ContainerProps): ReactElement {
  const {themeType, changeThemeType} = useDooboo();
  const [on, off] = useState(themeType === 'dark');
  const [fontsLoaded] = useFonts(fontConfig);

  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <StoryContainer>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Typography.Heading3>{themeType}</Typography.Heading3>
        <SwitchToggle
          size="small"
          isOn={on}
          onPress={() => {
            off(!on);
            changeThemeType();
          }}
          style={{padding: 8}}
        />
      </View>
      {children}
    </StoryContainer>
  );
}

export function renderStory(el: ReactElement): ReactElement {
  return (
    <DoobooProvider>
      <StoryWrapper>{el}</StoryWrapper>
    </DoobooProvider>
  );
}
