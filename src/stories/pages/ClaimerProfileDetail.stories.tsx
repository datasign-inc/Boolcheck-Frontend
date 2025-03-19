import type { Meta, StoryObj } from "@storybook/react";

import { withRouter } from "storybook-addon-remix-react-router";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";
import { ClaimerProfileDetail } from "../../pages/ClaimerProfileDetail/ClaimerProfileDetail.tsx";

const meta = {
  title: "Pages/ClaimerProfileDetail",
  component: ClaimerProfileDetail,
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
        path: "/claimer_profile_detail/:claimerId",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof ClaimerProfileDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
