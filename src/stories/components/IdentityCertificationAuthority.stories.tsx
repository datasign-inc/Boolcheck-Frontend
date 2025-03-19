import type { Meta, StoryObj } from "@storybook/react";
import { IdentityCertificationAuthority } from "../../components/IdentityCertificationAuthority/IdentityCertificationAuthority.tsx";

const meta = {
  title: "IdentityCertificationAuthority",
  component: IdentityCertificationAuthority,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof IdentityCertificationAuthority>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    issuerName: "株式会社DataSign",
    issuerLocality: "新宿区",
    issuerNationality: "日本",
    issuerUrl: "https://datasign.jp/",
    issuerState: "東京都",
    issuerAuthenticator: "GlobalSign ECC OV SSL CA 2018",
  },
};
