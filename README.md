# dooboo-ui

> React Native UI components built by `dooboolab`

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

[![Npm Version](http://img.shields.io/npm/v/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)
[![Downloads](http://img.shields.io/npm/dm/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)
[![CI](https://github.com/dooboolab/dooboo-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab/dooboo-ui/actions/workflows/ci.yml)
[![gh-pages](https://github.com/dooboolab/dooboo-ui/actions/workflows/gh-pages.yml/badge.svg)](https://dooboolab.github.io/dooboo-ui)
[![Publish](https://github.com/dooboolab/dooboo-ui/actions/workflows/publish.yml/badge.svg)](https://github.com/dooboolab/dooboo-ui/actions/workflows/publish.yml)
[![codecov](https://codecov.io/gh/dooboolab/dooboo-ui/branch/master/graph/badge.svg?token=ncTMAOVpOM)](https://codecov.io/gh/dooboolab/dooboo-ui)
[![Sponsor](https://opencollective.com/dooboo-ui/tiers/badge.svg?style=shield)](https://opencollective.com/dooboo-ui/tiers/badge.svg)
![License](http://img.shields.io/npm/l/dooboo-ui.svg?style=flat-square)

We love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) ui components built in [functional components](https://logrocket.com/blog/pure-functional-components) using hooks. Also the `dooboo-ui` is built on top of our favorite stacks like [emotion](https://emotion.sh/docs/@emotion/native), [typescript](https://typescript.org), [jest](https://jestjs.io), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro), [expo](https://expo.io), [storybook](https://storybook.js.org), and so on.

## Notice

Current project is forked from [dooboo-ui-legacy](https://github.com/dooboolab/dooboo-ui-legacy) to renew the project. We've made this decision because one of our sponsors wanted to rebrand this awesome project with better communication design and features. We are very happy to continue this project aggregating the aspiration of various people. The version of current project will start from `dooboo-ui@0.1.0` in [npm registry](https://www.npmjs.com).

## Documentation

Hosted in [github pages](https://dooboolab.github.io/dooboo-ui)

## Contributing to `dooboo-ui`

<img src="https://user-images.githubusercontent.com/27461460/120172586-2a65af00-c23e-11eb-9f61-0edd9f588964.png" width=420/>

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)
  - Please run `yarn pre` so that the packages are prepared.
    - If you are having trouble, try to run `yarn install:packages`.
  - Try to make awesome UI components and test them in `storybook`. Ensure to test in platforms we provide which are `iOS`, `android` and `web`. Then it's all good to go for `pull request`. Give it a try :blossom:.
- While implementing UI components you should run `yarn watch` in order to build typescript files dynamically while implementing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

## Usage

We aim to support `react-native` ui components in all platforms and we are currently targeting `iOS`, `android` and `web`. If you read [issue on plan for unifying dooboo-ui-legacy](https://github.com/dooboolab/dooboo-ui-legacy/issues/194), you can see in more detail how we want to drive this project.

From version `0.1.0`, we recommend you to wrap your App with `ThemeProvider` in order to apply colors correctly.

```tsx
import {ThemeProvider} from 'dooboo-ui';

<ThemeProvider>
  <App/>
</ThemeRpvoider>
```

## Theming

Follow the [README_THEME](./README_THEME.md)

## Install Font

You can install our font to use in your project.

- For React Native user

  1. Create `react-native.config.js` file and add below code.

     ```js
     module.exports = {
       project: {
         ios: {},
         android: {},
       },
     +  assets: ['dooboo-ui/main/Icon/doobooui.ttf'],
     };
     ```

  2. Run `yarn react-native link`.

  > For more information, please read [add custom fonts to react native](https://medium.com/@aravindmnair/add-custom-fonts-to-react-native-0-60-easily-in-3-steps-fcd71459f4c9).

- For Expo user

  1. In somwhere like `App.tsx`, load our font.

     ```js
     import {useFonts} from 'expo-font';

     const [fontsLoaded] = useFonts({
       IcoMoon: require('dooboo-ui/main/Icon/doobooui.ttf'),
     });
     ```

  > For more question please follow [using custom font in expo](https://docs.expo.io/guides/using-custom-fonts).

#### Using fonts

```js
import {Icon} from 'dooboo-ui';

...

<Icon name="like-solid" color="black" size={32} />;
```

## Compatibility

| package      | version |
| ------------ | ------- |
| react        | >=16.13 |
| react-native | >=0.58  |
| emotion      | \*      |

## List of independent components in `@dooboo-ui/*`

> Below elements are not included in `dooboo-ui` package since it depends on other packages that may overload its package.

- [CalendarCarousel](https://github.com/dooboolab/dooboo-ui/tree/master/packages/CalendarCarousel)
- [PinchZoom](https://github.com/dooboolab/dooboo-ui/tree/master/packages/PinchZoom)
- [Snackbar](https://github.com/dooboolab/dooboo-ui/tree/master/packages/Snackbar)
- [theme](https://github.com/dooboolab/dooboo-ui/tree/master/packages/theme)

## Troubleshoot

#### Workaround when you face error in expo web

You need to set webpack for using "dooboo-ui" in expo-web.

1.  Install @expo/webpack-config in your expo's project.
    `yarn add @expo/webpack-config`
    or `npm install @expo/webpack-config`

2.  Create webpack.config.js in root path and Add below code.
    See [issue](https://forums.expo.io/t/error-when-running-expo-start-web/33096/3) below for more details.

    ```javascript
    const createExpoWebpackConfigAsync = require('@expo/webpack-config');

    module.exports = async function (env, argv) {
      const config = await createExpoWebpackConfigAsync(
        {
          ...env,
          babel: {
            dangerouslyAddModulePathsToTranspile: ['dooboo-ui'],
          },
        },
        argv,
      );
      return config;
    };
    ```

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with
a link to your website. \[[Become a sponsor](https://opencollective.com/dooboolab-community#sponsor)\]
<a href="https://opencollective.com/dooboolab-community#sponsors" target="_blank"><img src="https://opencollective.com/dooboolab-community/sponsors.svg?width=890"></a>

### Backers

Please be our [Backers](https://opencollective.com/dooboolab-community#backers).
<a href="https://opencollective.com/dooboolab-community#backers" target="_blank"><img src="https://opencollective.com/dooboolab-community/backers.svg?width=890"></a>

### Contributing

Please make sure to read the [Contributing Guide](CONTRIBUTING.md) before making a pull request.
Thank you to all the people who helped to maintain and upgrade this project!

[![a relative link](https://opencollective.com/dooboolab-community/contributors.svg?width=890&button=true)](https://opencollective.com/dooboolab-community)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui?ref=badge_shield)
