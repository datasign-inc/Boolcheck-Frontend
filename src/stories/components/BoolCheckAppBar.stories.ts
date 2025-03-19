import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { BoolCheckAppBar } from "../../components/BoolCheckAppBar/BoolCheckAppBar.tsx";

const meta = {
  title: "AppBar",
  component: BoolCheckAppBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BoolCheckAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    text: "Home",
    align: "center",
  },
};

export const SearchResult: Story = {
  args: {
    text: "検索結果",
    backHandler: fn(),
  },
};

export const ContentAndComment: Story = {
  args: {
    text: "コンテンツ・真偽コメント",
    backHandler: fn(),
  },
};

export const InputComment: Story = {
  args: {
    text: "真偽情報を入力",
    backHandler: fn(),
  },
};

export const FinalCheck: Story = {
  args: {
    text: "最終確認",
  },
};

export const AboutDatabase: Story = {
  args: {
    text: "公開データベースとは",
    backHandler: fn(),
  },
};

export const CommentList: Story = {
  args: {
    text: "真偽コメント一覧",
    backHandler: fn(),
  },
};

export const CommentDetail: Story = {
  args: {
    text: "コメント詳細",
    backHandler: fn(),
  },
};

export const UsersComment: Story = {
  args: {
    text: "清水 誠",
    backHandler: fn(),
  },
};

export const Sign: Story = {
  args: {
    text: "署名",
    closeHandler: fn(),
  },
};
