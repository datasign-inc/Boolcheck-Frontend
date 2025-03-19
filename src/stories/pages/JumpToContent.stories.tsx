import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";
import { JumpToContent } from "../../pages/JumpToContent/JumpToContent.tsx";

const meta = {
  title: "Pages/JumpToContent",
  component: JumpToContent,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        state: {
          target: {
            urlUuid: "abc-123",
            url: "https://example.com/",
          },
        },
      },
      routing: {
        path: "/jump_to_content",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof JumpToContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
