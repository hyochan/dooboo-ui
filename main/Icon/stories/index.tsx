import IconStory from './DefaultStory';
import React from 'react';
import type {ReactElement} from 'react';
import {ThemeProvider} from '@dooboo-ui/theme';
import {storiesOf} from '@storybook/react-native';

/**
 * Below are stories for web
 */
export default {
  title: 'Icon',
};

export const toStorybook = (): ReactElement => <IconStory />;

toStorybook.story = {
  name: 'font icons',
};

/**
 * Below are stories for app
 */
storiesOf('Icon', module)
  .add('LIGHT', () => (
    <ThemeProvider initialThemeType="light">
      <IconStory />
    </ThemeProvider>
  ))
  .add('DARK', () => (
    <ThemeProvider initialThemeType="dark">
      <IconStory />
    </ThemeProvider>
  ));
