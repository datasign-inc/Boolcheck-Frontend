import type { Meta, StoryObj } from "@storybook/react";
import { FilterVerified } from "../../components/FilterVerified/FilterVerified.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "FilterVerified",
  component: FilterVerified,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof FilterVerified>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlyVerified: Story = {
  args: {
    countMessage: "5件",
    checked: true,
    onChangeHandler: fn(),
  },
};

export const All: Story = {
  args: {
    countMessage: "123件",
    checked: false,
    onChangeHandler: fn(),
  },
};
