import { describe, it, expect } from 'vitest';
import { getFallbackResponse } from '@/lib/chat-fallback';

describe('chat fallback AI chatbot guidance', () => {
  it('returns local chatbot build guidance for dataset chatbot questions', () => {
    const result = getFallbackResponse(
      'I want to create an AI chatbot using my dataset without server or API',
      'low'
    );

    expect(result.crisisLevel).toBe('low');
    expect(result.response).toContain('build a chatbot using your own data');
    expect(result.response).toContain('RAG pipeline');
    expect(result.response).toContain('API subscription');
  });

  it('explains free usage and website integration', () => {
    const result = getFallbackResponse(
      'Can I use it free, do I need subscription, and how will it work on my website?',
      'low'
    );

    expect(result.response).toContain('Can it be fully free?');
    expect(result.response).toContain('How it works on your website');
    expect(result.response).toContain('local model + local vector DB');
  });
});

