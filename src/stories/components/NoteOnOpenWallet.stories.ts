import type { Meta, StoryObj } from "@storybook/react";
import { NoteOnOpenWallet } from "../../components/NoteOnSign/NoteOnOpenWallet.tsx";

const meta = {
  title: "NoteOnOpenWallet",
  component: NoteOnOpenWallet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof NoteOnOpenWallet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appStoreUrl: "https://example.com/",
  },
};
