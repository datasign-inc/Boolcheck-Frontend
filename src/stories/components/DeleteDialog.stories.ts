import type { Meta, StoryObj } from "@storybook/react";
import { DeleteDialog } from "../../components/DeleteDialog/DeleteDialog.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "DeleteDialog",
  component: DeleteDialog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof DeleteDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deleteAction: fn(),
    cancelAction: fn(),
  },
};
