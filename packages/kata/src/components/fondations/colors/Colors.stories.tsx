import type { Meta, StoryObj } from '@storybook/react';
import { COLOR_TOKENS } from '@/lib/colors';

const meta: Meta = {
  title: 'Foundations/Color',
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

const Display = () => {
  return (
    <div className=" flex flex-col gap-2">
      {COLOR_TOKENS.map((value) => {
        return (
          <div key={value} className="flex items-center gap-4">
            <div className={`bg-${value} w-6 h-6`}></div>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export const Colors: Story = { render: () => <Display /> };
