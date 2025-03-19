import type { Meta, StoryObj } from "@storybook/react";
import { UrlWithComments } from "../../pages/UrlWithComments/UrlWithComments.tsx";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/UrlWithComments",
  component: UrlWithComments,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { urlUuid: "urlUuid" },
        state: {},
      },
      routing: {
        path: "/url_with_comments/:urlUuid",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof UrlWithComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
