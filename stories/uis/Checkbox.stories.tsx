import {type ComponentProps} from 'react';
import {Text} from 'react-native';
import type {Meta, StoryObj} from '@storybook/react';

import type {CheckboxColor} from '../../main';
import {Checkbox, DoobooProvider} from '../../main';
import {StoryWrapper} from '../Common';

const colors: CheckboxColor[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'secondary',
];

const meta = {
  title: 'Checkbox',
  component: (props) => <Checkbox {...props} />,
  argTypes: {
    color: {
      control: 'select',
      options: colors,
    },
    checked: {
      defaultValue: false,
      type: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <DoobooProvider>
        <StoryWrapper>
          <Story />
        </StoryWrapper>
      </DoobooProvider>
    ),
  ],
} satisfies Meta<ComponentProps<typeof Checkbox>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    color: 'primary',
    endElement: <Text>Click Checkbox!</Text>,
    checked: false,
    onPress: () => {},
  },
};
