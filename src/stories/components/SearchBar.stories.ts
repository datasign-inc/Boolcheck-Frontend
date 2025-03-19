import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";

const meta = {
  title: "SearchBar",
  component: SearchBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyInput: Story = {
  args: {
    text: "",
    onChangeHandler: fn(),
    searchHandler: fn(),
    clearHandler: fn(),
  },
};

export const UrlInputted: Story = {
  args: {
    text: "https://example.com/",
    onChangeHandler: fn(),
    searchHandler: fn(),
    clearHandler: fn(),
  },
};
