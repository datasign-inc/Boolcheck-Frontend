import type { Meta, StoryObj } from "@storybook/react";
import { IdentityAttributes } from "../../components/IdentityAtrributes/IdentityAttributes.tsx";

const meta = {
  title: "IdentityAttributes",
  component: IdentityAttributes,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof IdentityAttributes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    attributes: [
      { title: "姓名", value: "山田太郎" },
      { title: "役職名", value: "本部長" },
      { title: "所属組織の名称", value: "株式会社Example" },
    ],
  },
};
