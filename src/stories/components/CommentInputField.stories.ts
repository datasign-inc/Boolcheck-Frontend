import type { Meta, StoryObj } from "@storybook/react";
import { CommentInputField } from "../../components/CommentInputField/CommentInputField.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "CommentInput",
  component: CommentInputField,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof CommentInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: "",
    onChangeHandler: fn(),
  },
};

export const SomeComment: Story = {
  args: {
    value: "This is sample comment",
    onChangeHandler: fn(),
  },
};
