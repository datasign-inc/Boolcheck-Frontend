import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionFailed } from "../../components/ConnectionFailed/ConnectionFailed.tsx";

const meta = {
  title: "ConnectionFailed",
  component: ConnectionFailed,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof ConnectionFailed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
