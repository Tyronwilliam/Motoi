import type { Meta, StoryObj } from '@storybook/react';
import { MARGIN, PADDING, SPACING_SCALE } from '@/lib/spacing';
import type { SpacingType, SpacingValue } from './types';
import { cn } from 'cn';

const Display = ({
  value,
  type,
}: {
  value: SpacingValue;
  type: SpacingType;
}) => {
  const spacingClass =
    type === 'padding' ? PADDING.all[value] : MARGIN.all[value];

  return (
    <div className="flex items-center gap-4">
      <span className="w-10 text-sm text-muted-foreground">{value}</span>
      <div
        className={cn(
          type === 'padding' && `bg-primary/20 ${spacingClass}`,
          type === 'margin' && 'bg-muted',
        )}
      >
        <div
          className={cn('size-8 bg-primary', type === 'margin' && spacingClass)}
        />
      </div>
    </div>
  );
};

const PaddingDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      {SPACING_SCALE.map((value) => (
        <Display key={value} value={value} type="padding" />
      ))}
    </div>
  );
};

const MarginDemo = () => {
  return (
    <div className="flex flex-col gap-6">
      {SPACING_SCALE.map((value) => (
        <Display key={value} value={value} type="margin" />
      ))}
    </div>
  );
};

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

export const Padding: Story = { render: () => <PaddingDemo /> };
export const Margin: Story = { render: () => <MarginDemo /> };
