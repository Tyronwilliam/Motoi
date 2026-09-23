import { type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import * as React from 'react';

import { buttonVariants } from './styles';
import { ButtonVariants } from './types';
import { DEFAULT_SIZE, DEFAULT_VARIANT } from './constants';

type ButtonPrimitiveInternalProps = VariantProps<ButtonVariants> & {
  'data-testid'?: string;
};
type ButtonPrimitiveNativeProps = Omit<
  React.ComponentProps<'button'>,
  'className' | 'style'
>;

type ButtonPrimitive = ButtonPrimitiveInternalProps &
  ButtonPrimitiveNativeProps;

const ButtonPrimitive = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  'data-testid': dataTestId = 'button-primitive',
  type = 'button',
  ref,
  ...props
}: ButtonPrimitive) => {
  return (
    <button
      {...props}
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }))}
      data-testid={dataTestId}
      type={type}
      style={undefined}
    />
  );
};

export default ButtonPrimitive;
