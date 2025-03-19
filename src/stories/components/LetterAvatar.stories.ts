import type { Meta, StoryObj } from "@storybook/react";
import { LetterAvatar } from "../../components/LetterAvatar/LetterAvatar.tsx";

const meta = {
  title: "LetterAvatar",
  component: LetterAvatar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof LetterAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    letter: "Test",
  },
};

export const Secondary: Story = {
  args: {
    letter: "山",
  },
};
