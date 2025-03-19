import type { Meta, StoryObj } from "@storybook/react";
import { Founds } from "../../components/Founds/Founds.tsx";

const meta = {
  title: "Founds",
  component: Founds,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Founds>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Zero: Story = {
  args: {
    count: 0,
  },
};

export const Found: Story = {
  args: {
    count: 10000,
  },
};
