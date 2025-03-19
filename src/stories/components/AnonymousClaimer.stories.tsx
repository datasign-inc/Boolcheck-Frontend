import type { Meta, StoryObj } from "@storybook/react";
import { AnonymousClaimer } from "../../components/AnonymousClaimer/AnonymousClaimer.tsx";

const meta = {
  title: "AnonymousClaimer",
  component: AnonymousClaimer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof AnonymousClaimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
