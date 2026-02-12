import { loadDocument } from '@/lib/document-loader';
import { convertMarkdownToHTML } from '@/lib/markdown-to-html';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Sources & Transparency',
  description: 'Scientific sources and citations used by MindWell for evidence-based mental health information',
};

export default async function TransparencyPage() {
  const content = await loadDocument('SOURCES.md');
  
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
