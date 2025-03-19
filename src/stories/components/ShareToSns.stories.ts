import type { Meta, StoryObj } from "@storybook/react";
import { ShareToSns } from "../../components/ShareToSns/ShareToSns.tsx";

const meta = {
  title: "ShareToSns",
  component: ShareToSns,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof ShareToSns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    url: "https://example.com/",
  },
};
