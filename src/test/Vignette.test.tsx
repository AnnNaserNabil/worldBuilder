import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Vignette } from '../components/shared/Vignette';

describe('Vignette', () => {
  it('renders without crashing', () => {
    const { container } = render(<Vignette />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
