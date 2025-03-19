import type { Meta, StoryObj } from "@storybook/react";
import { SortTab } from "../../components/SortTab/SortTab.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "SortTab",
  component: SortTab,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof SortTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChangeTabHandler: fn(),
  },
};
