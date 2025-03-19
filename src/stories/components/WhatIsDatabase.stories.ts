import type { Meta, StoryObj } from "@storybook/react";
import { WhatIsDatabase } from "../../components/WhatIsDatabase/WhatIsDatabase.tsx";

const meta = {
  title: "WhatIsDatabase",
  component: WhatIsDatabase,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof WhatIsDatabase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
