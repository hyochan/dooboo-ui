import {boolean, number, select} from '@storybook/addon-knobs';
import {buttonColors, buttonSizes} from '../../const';

import {Button} from '../../../../main';
import type {ButtonSizeType} from '../../../../main';
// Caveat: Expo web needs React to be imported
import React from 'react';
import type {ReactElement} from 'react';
import {StorySection} from '../../../GlobalStyles';

function TextButtonColors(): ReactElement {
  const size = select<ButtonSizeType>('size', buttonSizes, 'medium');
  const disabled = boolean('disabled', false);
  const activeOpacity = number('activeOpacity', 0.8);

  return (
    <StorySection>
      {buttonColors.map((color) => (
        <Button
          key={color}
          type="text"
          disabled={disabled}
          activeOpacity={activeOpacity}
          color={color}
          size={size}
          text={color.toUpperCase()}
          style={{margin: 4}}
          // eslint-disable-next-line no-console
          onPress={() => console.log(`press ${color} text button`)}
        />
      ))}
    </StorySection>
  );
}

export default TextButtonColors;