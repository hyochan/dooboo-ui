import {DoobooTheme, light} from './theme';
import {Platform, Text, TextInput, View} from 'react-native';
import React, {FC, LegacyRef, useRef, useState} from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {useHover} from 'react-native-web-hooks';
import {withTheme} from '@emotion/react';

type Styles = {
  container?: StyleProp<ViewStyle>;
  hovered?: StyleProp<ViewStyle>;
  labelText?: StyleProp<TextStyle>;
  labelTextHovered?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
};

export type EditTextProps = {
  testID?: TextInputProps['testID'];
  inputRef?: LegacyRef<TextInput>;
  theme?: DoobooTheme;
  textInputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  styles?: Styles;
  labelText?: string;
  errorText?: string;
  value?: TextInputProps['value'];
  onChange?: TextInputProps['onChange'];
  onChangeText?: TextInputProps['onChangeText'];
  placeholder?: TextInputProps['placeholder'];
  placeholderColor?: TextInputProps['placeholderTextColor'];
  onFocus?: TextInputProps['onFocus'] | undefined;
  onBlur?: TextInputProps['onBlur'] | undefined;
  editable?: TextInputProps['editable'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  focusColor?: string;
  hoverColor?: string;
  errorColor?: string;
  disableColor?: string;
  labelColor?: string;
  type?: 'row' | 'column' | 'boxed';
};

const Component: FC<EditTextProps & {theme: DoobooTheme}> = ({
  theme,
  testID,
  inputRef,
  textInputProps,
  style,
  styles,
  labelText = '',
  errorText = '',
  value = '',
  placeholder,
  onChange,
  onChangeText,
  onFocus,
  onBlur,
  onSubmitEditing,
  autoCapitalize = 'none',
  secureTextEntry = false,
  editable = true,
  placeholderColor = theme.placeholder,
  focusColor = theme.primary,
  hoverColor = theme.primary,
  errorColor = theme.danger,
  disableColor = theme.disabled,
  labelColor = theme.placeholder,
  type = 'column',
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<View>(null);
  const hovered = useHover(ref);

  const borderColor = theme.text;
  const hoveredColor = theme.primary;
  const textColor = theme.text;

  const compositeStyles: Styles =
    type === 'column'
      ? {
          container: [
            {
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              borderBottomWidth: (focused && editable) || errorText ? 2 : 1,
              borderBottomColor: borderColor,

              flexDirection: 'column',
            },
            styles?.container,
          ],
          hovered: [
            {
              borderBottomWidth: 2,
              borderBottomColor: hoveredColor,
            },
            styles?.hovered,
          ],
          labelText: [
            {
              paddingHorizontal: 4,
              fontSize: 14,
              color: labelColor,
            },
            styles?.labelText,
          ],
          labelTextHovered: [
            {
              paddingHorizontal: 4,
              color: hoveredColor,
            },
            styles?.labelTextHovered,
          ],
          input: [
            {
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 14,
              color: !editable ? disableColor : textColor,
            },
            styles?.input,
          ],
          errorText: [
            {
              marginTop: 8,
              paddingHorizontal: 10,
              fontSize: 12,
              color: errorColor,
            },
            styles?.errorText,
          ],
        }
      : type === 'row'
      ? {
          container: [
            {
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: focused || errorText ? 2 : 1,
              borderBottomColor: borderColor,
            },
            styles?.container,
          ],
          hovered: [
            {
              borderBottomColor: hoveredColor,
              borderBottomWidth: 2,
            },
            styles?.hovered,
          ],
          labelText: [
            {
              fontSize: 14,
              color: labelColor,
              marginRight: 2,
            },
            styles?.labelText,
          ],
          labelTextHovered: [
            {
              color: hoveredColor,
            },
            styles?.labelTextHovered,
          ],
          input: [
            {
              paddingVertical: 10,
              paddingHorizontal: 8,
              fontSize: 14,
              flex: 1,
              color: !editable ? disableColor : textColor,
            },
            styles?.input,
          ],
          errorText: [
            {
              marginTop: 4,
              fontSize: 12,
              color: errorColor,
            },
            styles?.errorText,
          ],
        }
      : {
          container: [
            {
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              borderWidth: focused || errorText ? 2 : 1,
              borderColor,

              flexDirection: 'column',
            },
            styles?.container,
          ],
          hovered: [
            {
              borderWidth: 1,
              borderColor: hoveredColor,
            },
            styles?.hovered,
          ],
          labelText: [
            {
              paddingHorizontal: 8,
              marginTop: 6,
              fontSize: 14,
              color: labelColor,
            },
            styles?.labelText,
          ],
          labelTextHovered: [
            {
              paddingHorizontal: 4,
              color: hoveredColor,
            },
            styles?.labelTextHovered,
          ],
          input: [
            {
              textAlignVertical: 'top',
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 14,
              color: !editable ? disableColor : textColor,
              height: 120,
            },
            styles?.input,
          ],
          errorText: [
            {
              marginTop: 8,
              paddingHorizontal: 10,
              fontSize: 12,
              color: errorColor,
            },
            styles?.errorText,
          ],
        };

  return (
    <View
      testID="container-id"
      ref={Platform.select({
        web: ref,
        default: undefined,
      })}
      style={[{alignSelf: 'stretch', flexDirection: 'column'}, style]}>
      <View
        style={[
          compositeStyles.container,
          editable && hovered && compositeStyles.hovered,
          {
            borderColor: !editable
              ? disableColor
              : hovered
              ? hoverColor
              : errorText
              ? errorColor
              : focused
              ? focusColor
              : borderColor,
          },
          type !== 'boxed' && {
            borderBottomColor: !editable
              ? disableColor
              : hovered
              ? hoverColor
              : errorText
              ? errorColor
              : focused
              ? focusColor
              : borderColor,
          },
        ]}>
        {labelText ? (
          <Text
            style={[
              compositeStyles.labelText,
              hovered && editable && compositeStyles.labelTextHovered,
              !editable
                ? {color: disableColor}
                : errorText
                ? {color: errorColor}
                : focused
                ? {color: focusColor}
                : {},
            ]}>
            {labelText}
          </Text>
        ) : null}
        <TextInput
          testID={testID}
          ref={inputRef}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          style={[
            compositeStyles.input,
            // @ts-ignore
            Platform.OS === 'web' && {outlineWidth: 0},
          ]}
          editable={editable}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          multiline={type === 'boxed'}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChange={onChange}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...textInputProps}
        />
      </View>
      {editable ? (
        <Text
          style={[
            compositeStyles.errorText,
            styles?.errorText,
            {color: errorColor},
          ]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

Component.defaultProps = {theme: light};

export const EditText = withTheme(Component);
