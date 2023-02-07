// Caveat: Expo web needs React to be imported
import React, {useEffect, useState} from 'react';
import {StoryContainer, StoryTitle} from '../../GlobalStyles';
import {
  boolean as booleanInput,
  number as numberInput,
  select as selectInput,
} from '@storybook/addon-knobs';

import {ProgressCircle} from '../../../main';
import type {ReactElement} from 'react';
import {useTheme} from '@dooboo-ui/theme';

function ProgressCircleBasic(): ReactElement {
  const {changeThemeType} = useTheme();
  const progressInput = numberInput('progress', 0);
  const autoPlay = booleanInput('auto play', true);

  const type = selectInput(
    'type',
    ['success', 'info', 'warning', 'danger'],
    'info',
  );
  const themeType = selectInput('themeType', ['light', 'dark'], 'light');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(progressInput ?? 0);

    if (!autoPlay) {
      return;
    }

    let timeout;

    const timeoutCallback = (): void => {
      setProgress((prevProgress: number): number => {
        const nextProgress = prevProgress + Math.random() * 0.2;

        timeout = setTimeout(
          timeoutCallback,
          nextProgress >= 1 ? 1000 : Math.floor(Math.random() * 300 + 100),
        );

        if (prevProgress >= 1) {
          return 0;
        }

        return nextProgress;
      });
    };

    timeout = setTimeout(
      timeoutCallback,
      Math.floor(Math.random() * 500 + 100),
    );

    return () => clearTimeout(timeout);
  }, [progressInput, autoPlay]);

  useEffect(() => {
    changeThemeType(themeType);
  }, [changeThemeType, themeType]);

  return (
    <StoryContainer>
      <StoryTitle>Basic</StoryTitle>
      <ProgressCircle type={type} progress={progress} />
    </StoryContainer>
  );
}

export default ProgressCircleBasic;
