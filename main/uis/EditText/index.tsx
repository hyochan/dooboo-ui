import type {MutableRefObject, ReactElement, ReactNode, RefObject} from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {isValidElement, useRef, useState} from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {cloneElemWithDefaultColors} from '../../utils/guards';
import {useHover} from 'react-native-web-hooks';
import {useTheme} from '@dooboo-ui/theme';

type Styles = {
  container?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  error?: StyleProp<TextStyle>;
  counter?: StyleProp<TextStyle>;
};

export type EditTextStatus =
  | 'disabled'
  | 'error'
  | 'focused'
  | 'hovered'
  | 'basic';

type RenderType = (stats: EditTextStatus) => ReactElement;

type CustomElemRenderType = ({
  color,
  status,
}: {
  color: string;
  status: EditTextStatus;
}) => ReactElement;

export type EditTextProps = {
  testID?: TextInputProps['testID'];
  inputRef?: MutableRefObject<TextInput | undefined> | RefObject<TextInput>;

  style?: StyleProp<ViewStyle>;
  styles?: Styles;

  // Components
  label?: string | RenderType;
  error?: string | RenderType;
  startElement?: ReactElement | CustomElemRenderType;
  endElement?: ReactElement | CustomElemRenderType;

  direction?: 'row' | 'column';
  decoration?: 'underline' | 'boxed';

  value?: TextInputProps['value'];
  multiline?: TextInputProps['multiline'];
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
  maxLength?: TextInputProps['maxLength'];

  textInputProps?: Omit<
    TextInputProps,
    | 'value'
    | 'onChange'
    | 'multiline'
    | 'onChange'
    | 'onChangeText'
    | 'placeholder'
    | 'placeholderTextColor'
    | 'onFocus'
    | 'onBlur'
    | 'editable'
    | 'autoCapitalize'
    | 'secureTextEntry'
    | 'onSubmitEditing'
    | 'maxLength'
  >;

  colors?: {
    basic?: string;
    disabled?: string;
    error?: string;
    focused?: string;
    hovered?: string;
    placeholder?: string;
  };
};

export function EditText(props: EditTextProps): ReactElement {
  const {
    testID,
    inputRef: givenInputRef,
    textInputProps,
    style,
    styles,
    label,
    error,
    startElement,
    endElement,
    multiline = false,
    value = '',
    placeholder,
    placeholderColor,
    onChange,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    maxLength,
    autoCapitalize = 'none',
    secureTextEntry = false,
    editable = true,
    direction = 'column',
    decoration = 'underline',
    colors = {},
  } = props;

  const {theme} = useTheme();

  const [focused, setFocused] = useState(false);
  const ref = useRef<View>(null);
  const defaultInputRef = useRef(null);
  const inputRef =
    (givenInputRef as MutableRefObject<TextInput>) || defaultInputRef;
  const hovered = useHover(ref);

  const defaultContainerStyle: ViewStyle = {
    flexDirection: direction,
  };

  const defaultColor = !editable
    ? colors.disabled || theme.text.disabled
    : error
    ? colors.error || theme.text.validation
    : focused
    ? colors.focused || theme.text.basic
    : hovered
    ? colors.hovered || theme.text.basic
    : colors.placeholder || theme.text.placeholder;

  // Default label placeholder color has different value compared to default input placeholder color
  const labelPlaceholderColor = defaultColor ===
    (colors.placeholder || theme.text.placeholder) && {
    color: colors.placeholder || theme.text.disabled,
  };

  const status: EditTextStatus = !editable
    ? 'disabled'
    : error
    ? 'error'
    : hovered
    ? 'hovered'
    : focused
    ? 'focused'
    : 'basic';

  const renderLabel = (): ReactElement | null => {
    return typeof label === 'string' ? (
      <Text
        style={[{color: defaultColor}, labelPlaceholderColor, styles?.label]}
      >
        {label}
      </Text>
    ) : label ? (
      label(status)
    ) : null;
  };

  const renderContainer = (children: ReactNode): ReactElement => {
    return (
      <TouchableWithoutFeedback
        testID="container-touch"
        onPress={() => inputRef.current?.focus()}
      >
        <View
          testID="container"
          style={[
            defaultContainerStyle,
            {
              flexDirection: direction,
              alignItems: direction === 'row' ? 'center' : 'flex-start',
              justifyContent: 'space-between',
              // Default border color follows placeholder color for the label.
              borderColor: labelPlaceholderColor
                ? labelPlaceholderColor.color
                : defaultColor,
            },
            decoration === 'boxed'
              ? {borderWidth: 1, paddingHorizontal: 12, paddingTop: 8}
              : {borderBottomWidth: 1},
            styles?.container,
          ]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderInput = (): ReactElement => {
    return (
      <View
        style={{
          alignSelf: 'stretch',

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <>
          {isValidElement(startElement)
            ? cloneElemWithDefaultColors({
                element: startElement,
                color: defaultColor,
                style: {marginRight: 6},
              })
            : startElement?.({color: defaultColor, status})}
          <TextInput
            testID={testID}
            ref={inputRef}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            style={[
              // Stretch input in order to make remaining space clickable
              {flex: 1},
              // @ts-ignore
              Platform.OS === 'web' && {outlineWidth: 0},
              direction === 'column' ? {paddingTop: 12} : {paddingLeft: 12},
              {color: defaultColor, paddingVertical: 12},
              styles?.input,
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
            multiline={multiline}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor || theme.text.placeholder}
            onChange={onChange}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            {...textInputProps}
          />
          {isValidElement(endElement)
            ? cloneElemWithDefaultColors({
                element: endElement,
                color: defaultColor,
                style: {marginLeft: 6},
              })
            : endElement?.({color: defaultColor, status})}
        </>
      </View>
    );
  };

  const renderError = (): ReactElement | null => {
    return error ? (
      typeof error === 'string' ? (
        <Text
          style={[
            {color: theme.text.validation},
            {marginTop: 8},
            styles?.error,
          ]}
        >
          {error}
        </Text>
      ) : (
        error?.(status)
      )
    ) : null;
  };

  const renderCounter = (): ReactElement | null => {
    return maxLength ? (
      <Text
        style={[
          {
            position: 'absolute',
            color: theme.text.placeholder,
            alignSelf: 'flex-end',
            fontSize: 12,
            bottom: -24,
          },
          styles?.counter,
        ]}
      >{`${value.length}/${maxLength}`}</Text>
    ) : null;
  };

  return (
    <View
      testID="edit-text"
      ref={Platform.select({web: ref, default: undefined})}
      style={[{alignSelf: 'stretch', flexDirection: 'column'}, style]}
    >
      {renderContainer(
        <>
          {renderLabel()}
          {renderInput()}
          {renderCounter()}
        </>,
      )}
      {renderError()}
    </View>
  );
}