import {StoryContainer, StorySection, StoryTitle} from '../../GlobalStyles';

import {Button} from '../../../main';
import type {ButtonType} from '../../../main';
// Caveat: Expo web needs React to be imported
import React from 'react';
import type {ReactElement} from 'react';

function Basic(): ReactElement {
  const types: ButtonType[] = ['text', 'solid', 'outlined'];

  return (
    <StoryContainer>
      <StoryTitle>Basic</StoryTitle>
      <StorySection>
        {types.map((type) => (
          <Button
            key={type}
            type={type}
            text={`type: ${type}`}
            style={{margin: 4}} // eslint-disable-next-line no-console
            onPress={() => console.log(`press ${type} basic button`)}
          />
        ))}
      </StorySection>
    </StoryContainer>
  );
}

export default Basic;