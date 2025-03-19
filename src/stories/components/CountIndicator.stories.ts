import type { Meta, StoryObj } from "@storybook/react";
import { CountIndicator } from "../../components/CountIndicator/CountIndicator.tsx";

const meta = {
  title: "CountIndicator",
  component: CountIndicator,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof CountIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Zero: Story = {
  args: {
    hideAnonymousCount: true,
    trueCount: 0,
    falseCount: 0,
    indeterminateCount: 0,
    anonymousTrueCount: 0,
    anonymousFalseCount: 0,
    anonymousIndeterminateCount: 0,
  },
};

export const Voted: Story = {
  args: {
    hideAnonymousCount: false,
    trueCount: 999,
    falseCount: 9999,
    indeterminateCount: 99999,
    anonymousTrueCount: 0,
    anonymousFalseCount: 0,
    anonymousIndeterminateCount: 0,
  },
};
