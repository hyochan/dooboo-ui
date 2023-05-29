import type {ComponentProps, ReactElement} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';
import type {Meta, Story} from '@storybook/react/types-6-0';
import {DoobooProvider, EditText} from 'dooboo-ui';
import {useDarkMode} from 'storybook-dark-mode';

export default {
  title: 'EditText',
  component: EditText,
  viewMode: 'docs',
} as Meta;

type EditTextProps = ComponentProps<typeof EditText>;

const initialProps: EditTextProps = {
  label: 'Write any letters',
};

const Container = ({children}): ReactElement => {
  const isDark = useDarkMode();

  return (
    <DoobooProvider themeConfig={{initialThemeType: isDark ? 'dark' : 'light'}}>
      <View
        style={css`
          flex-direction: row;
        `}
      >
        {children}
      </View>
    </DoobooProvider>
  );
};

const EditTextStory: Story<EditTextProps> = (args): ReactElement => {
  const [value, setValue] = useState<string>('');

  return (
    <Container>
      <EditText
        {...args}
        style={css`
          flex: 1;
        `}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
    </Container>
  );
};

export const EditTextTemplate = EditTextStory.bind({});
EditTextTemplate.args = initialProps;