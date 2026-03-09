import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../components/shared/LoadingScreen';

describe('LoadingScreen', () => {
  it('shows the world sigil with first letter', () => {
    render(
      <LoadingScreen 
        onComplete={() => {}} 
        worldName="Misthold"
        tagline="Test tagline"
      />
    );
    
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('shows tagline', () => {
    render(
      <LoadingScreen 
        onComplete={() => {}} 
        worldName="TestWorld"
        tagline="Custom tagline text"
      />
    );
    
    expect(screen.getByText('Custom tagline text')).toBeInTheDocument();
  });

  it('shows Begin Journey button', () => {
    render(
      <LoadingScreen 
        onComplete={() => {}} 
        worldName="TestWorld"
        tagline="Test tagline"
      />
    );
    
    expect(screen.getByText('Begin Your Journey')).toBeInTheDocument();
  });

  it('renders particle effects container', () => {
    render(
      <LoadingScreen 
        onComplete={() => {}} 
        worldName="TestWorld"
        tagline="Test tagline"
      />
    );
    
    // Check for particle elements
    const particles = document.querySelectorAll('.absolute.left-1\\/2.top-1\\/2');
    expect(particles.length).toBeGreaterThan(0);
  });
});
