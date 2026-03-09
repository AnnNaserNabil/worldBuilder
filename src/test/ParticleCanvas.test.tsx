import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ParticleCanvas } from '../components/shared/ParticleCanvas';

describe('ParticleCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a canvas element', () => {
    render(<ParticleCanvas particleCount={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('accepts particleCount prop', () => {
    render(<ParticleCanvas particleCount={100} connectionDistance={150} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('accepts connectionDistance prop', () => {
    render(<ParticleCanvas particleCount={50} connectionDistance={200} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('accepts speed prop', () => {
    render(<ParticleCanvas particleCount={50} speed={0.5} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
