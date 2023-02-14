import {Button, Icon} from '../../../main';
import type {ButtonColorType, ButtonSizeType, ButtonType} from '../../../main';
import {StoryContainer, StorySection, StoryTitle} from '../../GlobalStyles';
import {boolean, number, select} from '@storybook/addon-knobs';
import {buttonColors, buttonSizes, buttonTypes} from '../const';

// Caveat: Expo web needs React to be imported
import React from 'react';
import type {ReactElement} from 'react';

function ButtonStartAndEndStory(): ReactElement {
  const type = select<ButtonType>('type', buttonTypes, 'solid');
  const color = select<ButtonColorType>('color', buttonColors, 'primary');
  const size = select<ButtonSizeType>('size', buttonSizes, 'medium');
  const disabled = boolean('disabled', false);
  const loading = boolean('loading', false);
  const activeOpacity = number('activeOpacity', 0.8);

  return (
    <StoryContainer>
      <StoryTitle>Start and end element</StoryTitle>
      <StorySection>
        <Button
          color={color}
          type={type}
          disabled={disabled}
          activeOpacity={activeOpacity}
          loading={loading}
          size={size}
          startElement={
            boolean('showElement', true) ? (
              <Icon name="HomeAlt" style={{marginRight: 8}} />
            ) : undefined
          }
          // eslint-disable-next-line no-console
          onPress={() => console.log(`press button with startElement`)}
          text="HOME"
          style={{margin: 4}}
        />
        <Button
          color={color}
          type={type}
          disabled={disabled}
          activeOpacity={activeOpacity}
          loading={loading}
          size={size}
          endElement={
            boolean('showElement', true) ? (
              <Icon name="HomeAlt" style={{marginLeft: 8}} />
            ) : undefined
          }
          // eslint-disable-next-line no-console
          onPress={() => console.log(`press button with endElement`)}
          text="HOME"
          style={{margin: 4}}
        />
      </StorySection>
    </StoryContainer>
  );
}

export default ButtonStartAndEndStory;
