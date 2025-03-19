import type { Meta, StoryObj } from "@storybook/react";
import { SearchResult } from "../../pages/SearchResult/SearchResult.tsx";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/SearchResult",
  component: SearchResult,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: mockApiForStorybook,
    },
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { searchQuery: "searchQuery" },
        state: {},
      },
      routing: {
        path: "/search_result/:searchQuery",
      },
    }),
  },
  tags: ["autodocs"],
  args: {},
  decorators: [withRouter],
} satisfies Meta<typeof SearchResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
