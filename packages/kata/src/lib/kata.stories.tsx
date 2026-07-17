import type { Meta, StoryObj } from '@storybook/react-vite';
import { MotoiKata } from './kata';
import { expect } from 'storybook/test';

const meta = {
  component: MotoiKata,
  title: 'MotoiKata',
} satisfies Meta<typeof MotoiKata>;
export default meta;

type Story = StoryObj<typeof MotoiKata>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/MotoiKata/gi)).toBeTruthy();
  },
} satisfies Story;
