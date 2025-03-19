import type { Meta, StoryObj } from "@storybook/react";
import { CancelSubmissionButton } from "../../components/Buttons/CancelSubmissionButton.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "CancelSubmissionButton",
  component: CancelSubmissionButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof CancelSubmissionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <>キャンセル</>,
    cancelHandler: fn(),
  },
};
