import type { Meta, StoryObj } from "@storybook/react";
import { Vote } from "../../components/Vote/Vote.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "Vote",
  component: Vote,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Vote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotClicked: Story = {
  args: {
    buttonHandler: fn(),
  },
};

export const ClickedTrue: Story = {
  args: {
    buttonHandler: fn(),
    buttonIndex: 0,
  },
};

export const ClickedFalse: Story = {
  args: {
    buttonHandler: fn(),
    buttonIndex: 1,
  },
};

export const ClickedIndeterminate: Story = {
  args: {
    buttonHandler: fn(),
    buttonIndex: 2,
  },
};
