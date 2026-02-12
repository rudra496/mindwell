import { loadDocument } from '@/lib/document-loader';
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

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-teal-600 dark:text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-200 dark:border-slate-700" />');
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 space-y-2">$1</ul>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<hr)/g, '$1');
  html = html.replace(/(hr \/>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  return html;
}
