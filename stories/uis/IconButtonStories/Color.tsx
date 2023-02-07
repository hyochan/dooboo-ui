import {StoryContainer, StorySection, StoryTitle} from '../../GlobalStyles';
import {boolean, number} from '@storybook/addon-knobs';

import type {ButtonColorType} from '../../../main';
import {IconButton} from '../../../main';
// Caveat: Expo web needs React to be imported
import React from 'react';
import type {ReactElement} from 'react';
import {action} from '@storybook/addon-actions';

function IconButtonColor(): ReactElement {
  const colors: ButtonColorType[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'light',
  ];

  return (
    <StoryContainer>
      <StoryTitle>Sizes</StoryTitle>
      <StorySection>
        {colors.map((color) => (
          <IconButton
            disabled={boolean('disabled', false)}
            activeOpacity={number('activeOpacity', 0.8)}
            loading={boolean('loading', false)}
            onPress={action('onPress')}
            key={color}
            color={color}
            size="small"
            icon="cross-light"
            style={{padding: 4}}
          />
        ))}
      </StorySection>
    </StoryContainer>
  );
}

export default IconButtonColor;
