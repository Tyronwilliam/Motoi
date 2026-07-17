import { render } from '@testing-library/react';

import MotoiKata from './kata';

describe('MotoiKata', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MotoiKata />);
    expect(baseElement).toBeTruthy();
  });
});
