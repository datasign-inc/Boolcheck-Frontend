import type { Meta, StoryObj } from "@storybook/react";
import { ContentAuthenticity } from "../../components/ContentAuthenticity/ContentAuthenticity.tsx";

const meta = {
  title: "ContentAuthenticity",
  component: ContentAuthenticity,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof ContentAuthenticity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentIsTrue: Story = {
  args: {
    authenticity: 1,
  },
};

export const ContentIsFalse: Story = {
  args: {
    authenticity: -1,
  },
};
export const ContentIsIndeterminate: Story = {
  args: {
    authenticity: 0,
  },
};
