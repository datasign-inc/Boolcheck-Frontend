import type { Meta, StoryObj } from "@storybook/react";
import { CommentInput } from "../../pages/CommentInput/CommentInput.tsx";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/CommentInput",
  component: CommentInput,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { urlUuid: "urlUuid" },
        state: {
          comment: {
            commentText: "Comment Text",
            authenticity: 1,
          },
        },
      },
      routing: {
        path: "/comment_input/:urlUuid",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof CommentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
