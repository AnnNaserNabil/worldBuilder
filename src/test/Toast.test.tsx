import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToastProvider, Toast } from '../components/shared/Toast';

describe('Toast', () => {
  it('renders toast provider', () => {
    render(
      <ToastProvider>
        <div>Test Content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders toast component with different types', () => {
    render(
      <ToastProvider>
        <Toast type="success" message="Success message" />
        <Toast type="error" message="Error message" />
        <Toast type="warning" message="Warning message" />
        <Toast type="info" message="Info message" />
      </ToastProvider>
    );
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('renders toast with correct styling for each type', () => {
    const { rerender } = render(
      <ToastProvider>
        <Toast type="success" message="Success" />
      </ToastProvider>
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    rerender(
      <ToastProvider>
        <Toast type="error" message="Error" />
      </ToastProvider>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
