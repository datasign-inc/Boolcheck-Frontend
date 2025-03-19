import type { Meta, StoryObj } from "@storybook/react";
import { CommentDetail } from "../../pages/CommentDetail/CommentDetail.tsx";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Pages/CommentDetail",
  component: CommentDetail,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { commentUuid: "commentUuid" },
        state: {},
      },
      routing: {
        path: '"/comment_detail/:commentUuid',
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof CommentDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
