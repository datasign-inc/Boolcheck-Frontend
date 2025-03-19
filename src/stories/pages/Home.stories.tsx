import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { Home } from "../../pages/Home/Home.tsx";
import { mockApiForStorybook } from "../mockApiForStorybook.ts";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    msw: {
      handlers: mockApiForStorybook,
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
