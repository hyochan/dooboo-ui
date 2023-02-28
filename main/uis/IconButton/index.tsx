import type {FC, ReactElement, ReactNode} from 'react';
import {Platform, TouchableHighlight, View} from 'react-native';
import React, {useRef} from 'react';
import type {StyleProp, TouchableHighlightProps, ViewStyle} from 'react-native';

import type {DoobooTheme} from '@dooboo-ui/theme';
import {Icon} from '../Icon/';
import type {IconName} from '../Icon/';
import {LoadingIndicator} from '../LoadingIndicator';
import {css} from '@emotion/native';
import {getTheme} from '../../utils/utils';
import {useHover} from 'react-native-web-hooks';
import {useTheme} from '@dooboo-ui/theme';

type Styles = {
  container?: StyleProp<ViewStyle>;
  icon?: StyleProp<ViewStyle>;
  disabled?: StyleProp<ViewStyle>;
  hovered?: StyleProp<ViewStyle>;
};

type ButtonType = 'text' | 'solid' | 'outlined';

type ButtonColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light';

type ButtonSizeType = 'small' | 'medium' | 'large';

export const ButtonStyles = ({
  theme,
  type = 'solid',
  color = 'primary',
  size = 'medium',
  loading,
  disabled,
}: {
  theme?: DoobooTheme;
  type?: ButtonType;
  color?: ButtonColorType;
  size?: ButtonSizeType;
  disabled?: boolean;
  loading?: boolean;
}): {
  padding?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  buttonSize: number;
  iconColor?: string;
  iconSize?: number;
  disabledBackgroundColor: string;
  disabledBorderColor: string;
  disabledTextColor: string;
} => {
  theme = getTheme(theme);

  let backgroundColor = theme.button[color].bg;
  let borderColor = theme.button[color].bg;
  let iconColor = theme.button[color].bg;

  if (disabled) {
    backgroundColor = theme.button.disabled.bg;
    borderColor = theme.button.disabled.text;
    iconColor = theme.button.disabled.text;
  }

  if (['text', 'outlined'].includes(type)) {
    backgroundColor = theme.bg.basic;
  }

  if (type === 'solid' || color === 'light') {
    iconColor = theme.button[color].text;
  }

  return {
    backgroundColor,
    borderColor,
    borderWidth: type === 'outlined' ? 1 : 0,
    buttonSize: size === 'large' ? 80 : size === 'medium' ? 50 : 32,
    iconColor,
    iconSize: size === 'large' ? 32 : size === 'medium' ? 24 : 16,
    disabledBackgroundColor:
      type === 'solid' && !loading ? theme.button.disabled.bg : theme.bg.basic,
    disabledBorderColor: theme.bg.disabled,
    disabledTextColor: theme.button.disabled.text,
  };
};

export type IconButtonProps = {
  testID?: string;
  type?: ButtonType;
  color?: ButtonColorType;
  size?: ButtonSizeType;
  disabled?: boolean;
  loading?: boolean;
  loadingElement?: ReactElement;
  icon?: IconName;
  iconElement?: ReactElement;
  style?: StyleProp<Omit<ViewStyle, 'borderRadius' | 'padding'>>;
  styles?: Styles;
  onPress?: TouchableHighlightProps['onPress'];
  activeOpacity?: TouchableHighlightProps['activeOpacity'];
  touchableHighlightProps?: Omit<
    TouchableHighlightProps,
    'onPress' | 'activeOpacity' | 'style'
  >;
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const {
    testID,
    type = 'solid',
    color = 'primary',
    size = 'medium',
    disabled,
    loading = false,
    loadingElement,
    icon,
    iconElement,
    style,
    styles,
    onPress,
    activeOpacity = 0.8,
    touchableHighlightProps,
  } = props;

  const ref = useRef<TouchableHighlight>(null);
  const hovered = useHover(ref);

  const {theme, themeType} = useTheme();

  const {
    backgroundColor,
    borderColor,
    borderWidth,
    buttonSize,
    iconColor,
    iconSize,
    disabledBackgroundColor,
    disabledBorderColor,
  } = ButtonStyles({
    theme,
    type,
    color,
    size,
    loading,
    disabled,
  });

  const buttonSizeStr = `${buttonSize}px`;
  const borderWidthStr = `${borderWidth}px`;

  const compositeStyles: Styles = {
    container: css`
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      border-radius: ${buttonSizeStr};
      border-width: ${borderWidthStr};
      height: ${buttonSizeStr};
      width: ${buttonSizeStr};
    `,
    icon: css`
      color: ${iconColor};
    `,
    disabled: css`
      background-color: ${disabledBackgroundColor};
      border-color: ${disabledBorderColor};
    `,
    hovered: {
      shadowColor: theme.text.basic,
      shadowOpacity: 0.24,
      shadowRadius: 16,
      elevation: 10,
    },
    ...styles,
  };

  const renderContainer = (children: ReactNode): ReactElement => {
    return (
      <View
        testID={loading ? 'loading-view' : 'button-container'}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          },
          compositeStyles.container,
          hovered && !disabled && compositeStyles.hovered,
          disabled && compositeStyles.disabled,
        ]}
      >
        {children}
      </View>
    );
  };

  const renderLoading = (): ReactElement =>
    loadingElement ?? (
      <LoadingIndicator size="small" color={theme.text.basic} />
    );

  const renderChild = (): ReactElement =>
    iconElement || (
      <Icon size={iconSize} color={iconColor} name={icon || 'Dooboolab'} />
    );

  return (
    <TouchableHighlight
      testID={testID}
      ref={Platform.select({
        web: ref,
        default: undefined,
      })}
      underlayColor={themeType === 'light' ? '#000000' : '#FFFFFF'}
      activeOpacity={activeOpacity}
      onPress={onPress}
      delayPressIn={50}
      disabled={disabled || loading}
      style={[style, {borderRadius: buttonSize}]}
      {...touchableHighlightProps}
    >
      {renderContainer(loading ? renderLoading() : renderChild())}
    </TouchableHighlight>
  );
};