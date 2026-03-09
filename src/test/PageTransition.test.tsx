import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageTransition, StaggerChildren, FadeIn } from '../components/shared/PageTransition';

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies fade mode by default', () => {
    render(
      <PageTransition mode="fade">
        <div>Fade Content</div>
      </PageTransition>
    );
    expect(screen.getByText('Fade Content')).toBeInTheDocument();
  });

  it('accepts duration prop', () => {
    render(
      <PageTransition duration={0.5}>
        <div>Timed Content</div>
      </PageTransition>
    );
    expect(screen.getByText('Timed Content')).toBeInTheDocument();
  });
});

describe('StaggerChildren', () => {
  it('renders children', () => {
    render(
      <StaggerChildren>
        <div>Child 1</div>
        <div>Child 2</div>
      </StaggerChildren>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});

describe('FadeIn', () => {
  it('renders children with fade animation', () => {
    render(
      <FadeIn>
        <div>Fading Content</div>
      </FadeIn>
    );
    expect(screen.getByText('Fading Content')).toBeInTheDocument();
  });
});
