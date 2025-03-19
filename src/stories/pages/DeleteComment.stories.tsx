import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";
import { DeleteComment } from "../../pages/DeleteComment/DeleteComment.tsx";

const meta = {
  title: "Pages/DeleteComment",
  component: DeleteComment,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {},
        state: {
          claimId: "claim-id-123",
        },
      },
      routing: {
        path: "/delete_comment",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof DeleteComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
