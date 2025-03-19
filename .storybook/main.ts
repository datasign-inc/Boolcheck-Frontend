import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    'storybook-react-i18next',
    "storybook-addon-remix-react-router"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
