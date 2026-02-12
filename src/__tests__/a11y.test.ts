import { describe, it, expect } from 'vitest';

describe('Accessibility', () => {
  it('has accessibility CSS file', () => {
    // This test verifies that the a11y.css file exists and contains key accessibility features
    const fs = require('fs');
    const path = require('path');
    const a11yPath = path.join(process.cwd(), 'src/app/a11y.css');
    
    const exists = fs.existsSync(a11yPath);
    expect(exists).toBe(true);
    
    if (exists) {
      const content = fs.readFileSync(a11yPath, 'utf-8');
      expect(content).toContain('.sr-only');
      expect(content).toContain('prefers-reduced-motion');
      expect(content).toContain('focus-visible');
    }
  });

  it('has proper touch target sizes defined', () => {
    const fs = require('fs');
    const path = require('path');
    const a11yPath = path.join(process.cwd(), 'src/app/a11y.css');
    
    if (fs.existsSync(a11yPath)) {
      const content = fs.readFileSync(a11yPath, 'utf-8');
      expect(content).toContain('min-height: 44px');
      expect(content).toContain('min-width: 44px');
    }
  });
});
