import type { Preview } from "@storybook/react";
import i18n from './i18next';
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize()

const preview: Preview = {
  initialGlobals: {
    locale: 'ja',
    locales: {
      en: 'English',
      ja: '日本語',
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    i18n
  },
  loaders: [mswLoader]
};

export default preview;
