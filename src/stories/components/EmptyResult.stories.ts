import type { Meta, StoryObj } from "@storybook/react";
import { EmptyResult } from "../../components/EmptyResult/EmptyResult.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "EmptyResult",
  component: EmptyResult,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof EmptyResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    addHandler: fn(),
  },
};
