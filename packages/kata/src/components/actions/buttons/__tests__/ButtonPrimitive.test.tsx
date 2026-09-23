import { createRef } from 'react';
import { ByRoleOptions, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import ButtonPrimitive from '../ButtonPrimitive';

// To externalise in utils/test
const getBtn = (options?: ByRoleOptions | undefined): HTMLButtonElement => {
  return screen.getByRole('button', options ? options : { name: 'Button' });
};

describe('ButtonPrimitive', () => {
  const content = 'Button';
  const user = userEvent.setup();

  const renderComponents = (props?: ButtonPrimitive) => {
    return render(<ButtonPrimitive {...props}>{content}</ButtonPrimitive>);
  };

  it('should renders its children', () => {
    renderComponents();
    const button = getBtn();
    expect(button).toBeTruthy();
  });

  it('should calls onClick when clicked', async () => {
    const onClick = vi.fn();
    renderComponents({ onClick });

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    renderComponents({ disabled: true });

    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should reflects the variant/size props as data attributes', () => {
    renderComponents();

    const button = getBtn();
    expect(button.getAttribute('data-variant')).toBe('default');
    expect(button.getAttribute('data-size')).toBe('default');
  });

  it('should reflects the new variant/size props as data attributes', () => {
    renderComponents({
      variant: 'destructive',
      size: 'icon-lg',
    });

    const button = getBtn();
    expect(button.getAttribute('data-variant')).toBe('destructive');
    expect(button.getAttribute('data-size')).toBe('icon-lg');
  });

  it('should have the default data-testid', () => {
    renderComponents();

    const button = getBtn();
    expect(button.getAttribute('data-testid')).toBe('button-primitive');
  });

  it('should change the data-testid', () => {
    renderComponents({
      'data-testid': 'button-datatestid',
    });

    const button = getBtn();
    expect(button.getAttribute('data-testid')).toBe('button-datatestid');
  });

  it('should change the default type', () => {
    renderComponents();

    const button = getBtn();
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should change the type to submit', () => {
    renderComponents({
      type: 'submit',
    });

    const button = getBtn();
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should not propagate className and style', () => {
    renderComponents({
      className: 'not-applied',
      style: { color: 'red' },
    } as ButtonPrimitive);

    const button = getBtn();
    expect(button.className).not.toContain('not-applied');
    expect(button.className).toContain('bg-primary');
    expect(button.style.color).not.toBe('red');
  });

  it('should have the data-slot attribute', () => {
    renderComponents();

    const button = getBtn();
    expect(button.getAttribute('data-slot')).toBe('button');
  });

  it('should be disabled in the DOM when disabled', () => {
    renderComponents({ disabled: true });

    const button = getBtn();
    expect(button).toBeDisabled();
  });

  it('should forward arbitrary props to the button', () => {
    renderComponents({ 'aria-label': 'Save', id: 'save-button' });

    const button = getBtn({ name: 'Save' });
    expect(button.getAttribute('aria-label')).toBe('Save');
    expect(button.getAttribute('id')).toBe('save-button');
  });

  it('should forward the ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    renderComponents({ ref });

    const button = getBtn();
    expect(ref.current).toBe(button);
  });
});
