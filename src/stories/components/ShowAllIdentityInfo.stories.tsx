import type { Meta, StoryObj } from "@storybook/react";
import { ShowAllIdentityInfo } from "../../components/ShowAllIdentityInfo/ShowAllIdentityInfo.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "ShowAllIdentityInfo",
  component: ShowAllIdentityInfo,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof ShowAllIdentityInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Show: Story = {
  args: {
    clickHandler: fn(),
  },
};
