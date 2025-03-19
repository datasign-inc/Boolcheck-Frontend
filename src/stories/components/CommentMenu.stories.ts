import type { Meta, StoryObj } from "@storybook/react";
import { CommentMenu } from "../../components/CommentMenu/CommentMenu.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "CommentMenu",
  component: CommentMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof CommentMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    deleteHandler: fn(),
  },
};
