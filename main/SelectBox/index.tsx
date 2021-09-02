import {
  Animated,
  Easing,
  Platform,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {DoobooTheme, light} from '../theme';
import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';

import {Icon} from '../Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Typography} from '../Typography';
import styled from '@emotion/native';
import {withTheme} from '@emotion/react';

const Title = styled.View`
  width: 200px;
  height: 30px;
  border-width: 1px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Item = styled.View`
  height: 30px;
  width: 200px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;

  justify-content: center;
  align-items: center;
`;

type Styles = {
  titleContainer?: StyleProp<ViewStyle>;
  titleText?: StyleProp<TextStyle>;
  rightElementContainer?: StyleProp<ViewStyle>;
  itemContainer?: StyleProp<ViewStyle>;
  itemText?: StyleProp<TextStyle>;
};
interface ItemCompProps {
  value: string;
  order: number;
  styles?: Styles;
  setIsOpened: (value: boolean) => void;
  itemActiveOpacity: number;
  onPress?: (i: number) => void;
}

const ItemComp: FC<ItemCompProps & {theme: DoobooTheme}> = ({
  value,
  order,
  styles,
  theme,
  setIsOpened,
  itemActiveOpacity,
  onPress,
}) => {
  const handlePress = (): void => {
    onPress?.(order);
    setIsOpened(false);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={itemActiveOpacity}>
      <Item
        style={[
          {
            borderColor: theme.primary,
            backgroundColor: theme.textContrast,
          },
          styles?.itemContainer,
        ]}>
        <Typography.Body2 style={styles?.itemText}>{value}</Typography.Body2>
      </Item>
    </TouchableOpacity>
  );
};

export interface Props {
  data: string[];
  onPress?: (i: number) => void;
  selectedIndex?: number;
  style?: StyleProp<ViewStyle>;
  styles?: Styles;
  rotateDuration?: number;
  titleActiveOpacity?: number;
  itemActiveOpacity?: number;
  shouldRotate?: boolean;
  rightElement?: ReactElement | null;
}

const Component: FC<Props & {theme: DoobooTheme}> = ({
  data,
  onPress,
  theme,
  selectedIndex = 0,
  style,
  styles,
  rotateDuration = 200,
  titleActiveOpacity = 1,
  itemActiveOpacity = 1,
  shouldRotate = true,
  rightElement = <Icon name="chevron-down-light" />,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const rotateAnimValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = isOpened ? 1 : 0;

    if (!shouldRotate) rotateAnimValue.setValue(toValue);

    Animated.timing(rotateAnimValue, {
      toValue,
      duration: rotateDuration,
      easing: Easing.linear,
      useNativeDriver: Platform.OS !== 'web' ? true : false,
    }).start();
  }, [isOpened, rotateAnimValue, rotateDuration, shouldRotate]);

  return (
    <View style={[style]}>
      <TouchableOpacity
        onPress={() => setIsOpened((prev) => !prev)}
        activeOpacity={titleActiveOpacity}>
        <Title
          style={[
            {
              borderColor: theme.primary,
              backgroundColor: theme.textContrast,
            },
            styles?.titleContainer,
          ]}>
          <Typography.Body2 style={styles?.titleText}>
            {data[selectedIndex]}
          </Typography.Body2>
          {rightElement ? (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  right: 10,
                  transform: [
                    {
                      rotate: rotateAnimValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                },
                styles?.rightElementContainer,
              ]}>
              {rightElement}
            </Animated.View>
          ) : null}
        </Title>
      </TouchableOpacity>
      <View>
        <View style={{position: 'absolute'}}>
          {isOpened &&
            data.map((datum, key) => (
              <ItemComp
                key={key}
                order={key}
                value={datum}
                styles={styles}
                setIsOpened={setIsOpened}
                onPress={onPress}
                itemActiveOpacity={itemActiveOpacity}
                theme={theme}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

Component.defaultProps = {theme: light};

export const SelectBox = withTheme(Component);
