import { loadDocument } from '@/lib/document-loader';
import { convertMarkdownToHTML } from '@/lib/markdown-to-html';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description: 'Important medical disclaimer - MindWell is for educational purposes only',
};

export default async function MedicalDisclaimerPage() {
  const content = await loadDocument('MEDICAL_DISCLAIMER.md');
  
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
