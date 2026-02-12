import { loadDocument } from '@/lib/document-loader';
import { convertMarkdownToHTML } from '@/lib/markdown-to-html';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MindWell terms of service - usage guidelines and legal information',
};

export default async function TermsPage() {
  const content = await loadDocument('TERMS.md');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }}
        />
      </article>
    </div>
  );
}
