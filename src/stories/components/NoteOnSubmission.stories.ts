import type { Meta, StoryObj } from "@storybook/react";
import { NoteOnSubmission } from "../../components/NoteOnSubmission/NoteOnSubmission.tsx";

const meta = {
  title: "NoteOnSubmission",
  component: NoteOnSubmission,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof NoteOnSubmission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
