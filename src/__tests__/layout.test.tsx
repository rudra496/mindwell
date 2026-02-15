import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccessibilitySkipLink } from '@/components/AccessibilitySkipLink';
import { EmergencySupportBar } from '@/components/safety/EmergencySupportBar';

describe('Layout Components', () => {
  it('renders AccessibilitySkipLink', () => {
    render(<AccessibilitySkipLink />);
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
  });

  it('renders EmergencySupportBar with generic crisis guidance on non-home routes', () => {
    window.history.pushState({}, '', '/faq');
    render(<EmergencySupportBar />);
    expect(screen.getByText(/crisis support resources are available/i)).toBeInTheDocument();
    expect(screen.getByText(/view crisis resources by country/i)).toBeInTheDocument();
  });
});
