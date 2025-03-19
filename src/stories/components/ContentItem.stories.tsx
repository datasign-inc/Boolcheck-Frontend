import type { Meta, StoryObj } from "@storybook/react";
import { ContentItem } from "../../components/ContentItem/ContentItem.tsx";
import { MemoryRouter } from "react-router";

const meta = {
  title: "ContentItem",
  component: ContentItem,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ContentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutUrl: Story = {
  args: {
    content: {
      url: "https://fashion.example.com",
      domain: "fashion.example.com",
      id: "abcdefg4",
      contentType: "website",
      title: "fashion",
      description: "株価4451円余下落 終値で過去最大の値下がり 米経済減速懸念",
      trueCount: 10,
      falseCount: 9999,
      elseCount: 50,
      verifiedTrueCount: 5,
      verifiedFalseCount: 43,
      verifiedElseCount: 12,
      createdAt: "2024-04-01T00:00:00.000Z",
    },
    showUrl: false,
    searchQuery: "",
    fromHome: false,
    transitionToUrlComemnts: false,
    hideCount: false,
    jumpToContent: false,
    hideAnonymousCount: false,
  },
};

export const WithUrl: Story = {
  args: {
    showUrl: true,
    jumpToContent: false,
    searchQuery: "",
    fromHome: false,
    transitionToUrlComemnts: false,
    hideCount: false,
    hideAnonymousCount: false,
    content: {
      id: "abcdefg4",
      contentType: "website",
      title: "fashion",
      description: "株価4451円余下落 終値で過去最大の値下がり 米経済減速懸念",
      trueCount: 10,
      falseCount: 9999,
      elseCount: 50,
      verifiedTrueCount: 4,
      verifiedFalseCount: 3,
      verifiedElseCount: 2,
      url: "https://evil.example.com/article.html",
      domain: "evil.example.com",
      createdAt: "2024-04-01T00:00:00.000Z",
    },
  },
};

export const WithoutCount: Story = {
  args: {
    hideCount: true,
    jumpToContent: false,
    showUrl: true,
    searchQuery: "",
    fromHome: false,
    transitionToUrlComemnts: false,
    hideAnonymousCount: false,
    content: {
      id: "abcdefg4",
      contentType: "website",
      title: "example.com",
      description: "株価4451円余下落 終値で過去最大の値下がり 米経済減速懸念",
      trueCount: 10,
      falseCount: 9999,
      elseCount: 50,
      verifiedTrueCount: 4,
      verifiedFalseCount: 10,
      verifiedElseCount: 4,
      url: "https://evil.example.com/article.html",
      domain: "evil.example.com",
      createdAt: "2024-04-01T00:00:00.000Z",
    },
  },
};

export const WithHandler: Story = {
  args: {
    showUrl: true,
    jumpToContent: false,
    searchQuery: "",
    fromHome: false,
    transitionToUrlComemnts: false,
    hideCount: false,
    hideAnonymousCount: false,
    content: {
      id: "abcdefg4",
      contentType: "website",
      title: "example.com",
      description: "株価4451円余下落 終値で過去最大の値下がり 米経済減速懸念",
      trueCount: 10,
      falseCount: 9999,
      elseCount: 50,
      verifiedTrueCount: 2,
      verifiedFalseCount: 2,
      verifiedElseCount: 2,
      url: "https://evil.example.com/article.html",
      domain: "evil.example.com",
      createdAt: "2024-04-01T00:00:00.000Z",
    },
  },
};
