import {DoobooProvider} from '../../../main';
import React from 'react';
import SnackbarContent from './BasicStory';
import {storiesOf} from '@storybook/react-native';

storiesOf('[Modal] Snackbar', module)
  .add('Basic - light', () => (
    <DoobooProvider themeConfig={{initialThemeType: 'light'}}>
      <SnackbarContent />
    </DoobooProvider>
  ))
  .add('Basic - dark', () => (
    <DoobooProvider themeConfig={{initialThemeType: 'dark'}}>
      <SnackbarContent />
    </DoobooProvider>
  ));