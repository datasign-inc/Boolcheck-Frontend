import type { Meta, StoryObj } from "@storybook/react";
import { ClaimerComments } from "../../pages/ClaimerComments/ClaimerComments.tsx";

import { withRouter } from "storybook-addon-remix-react-router";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/ClaimerComments",
  component: ClaimerComments,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { claimerId: "claimerId" },
        state: {},
      },
      routing: {
        path: "/claimer_comments/:claimerId",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof ClaimerComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
