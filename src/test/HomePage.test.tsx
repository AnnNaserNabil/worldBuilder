import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

describe('HomePage', () => {
  it('renders the world name', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText('Misthold')).toBeInTheDocument();
  });

  it('renders the world description', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const description = screen.getByText(/A realm shrouded in eternal twilight/i);
    expect(description).toBeInTheDocument();
  });

  it('renders all navigation cards', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('World Map')).toBeInTheDocument();
    expect(screen.getAllByText('Timeline').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Characters').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Factions').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Economy').length).toBeGreaterThan(0);
    expect(screen.getByText('Lore Library')).toBeInTheDocument();
  });

  it('renders stats section with labels', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Regions')).toBeInTheDocument();
    expect(screen.getAllByText('Factions').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Characters').length).toBeGreaterThan(0);
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });
});
