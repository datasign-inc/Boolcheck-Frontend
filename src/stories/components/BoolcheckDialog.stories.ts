import { fn } from "@storybook/test";
import { BoolcheckDialog } from "../../components/BoolcheckDialog/BoolcheckDialog.tsx";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "BoolcheckDialog",
  component: BoolcheckDialog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BoolcheckDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "dialog title",
    message: "dialog message",
    okAction: fn(),
    cancelAction: fn(),
  },
};

export const WithoutCancel: Story = {
  args: {
    title: "dialog title",
    message: "dialog message",
    okAction: fn(),
  },
};
