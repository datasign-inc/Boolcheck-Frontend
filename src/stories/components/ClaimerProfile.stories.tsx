import type { Meta, StoryObj } from "@storybook/react";
import { ClaimerProfile } from "../../components/ClaimerProfile/ClaimerProfile.tsx";

const meta = {
  title: "ClaimerProfile",
  component: ClaimerProfile,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof ClaimerProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentIsTrue: Story = {
  args: {
    attributes: ["ID:00000000000000", "ほげ株式会社代表取締役", "東京都"],
    name: "山田太郎",
  },
};
