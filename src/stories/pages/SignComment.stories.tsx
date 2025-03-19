import type { Meta, StoryObj } from "@storybook/react";
import { SignComment } from "../../pages/SignComment/SignComment.tsx";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/SignComment",
  component: SignComment,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {},
        state: {
          target: { id: "urlUuid" },
          commentText: "Comment Text",
          authenticity: 1,
        },
      },
      routing: {
        path: "/sign_comment",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof SignComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
