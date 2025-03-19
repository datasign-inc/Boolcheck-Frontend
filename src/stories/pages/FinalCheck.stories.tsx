import type { Meta, StoryObj } from "@storybook/react";
import { FinalCheck } from "../../pages/FinalCheck/FinalCheck.tsx";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/FinalCheck",
  component: FinalCheck,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { commentUuid: "commentUuid" },
        state: {
          commentText: "Comment Text",
          authenticity: 1,
        },
      },
      routing: {
        path: "/final_check",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof FinalCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
