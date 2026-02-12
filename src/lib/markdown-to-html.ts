/**
 * Simple markdown to HTML converter
 * Handles basic markdown syntax for legal documents
 */
export function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-teal-600 dark:text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-200 dark:border-slate-700" />');
  
  // Lists - process line by line
  const lines = html.split('\n');
  let inList = false;
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.match(/^[\-\*] /)) {
      if (!inList) {
        processedLines.push('<ul class="list-disc pl-6 space-y-2 my-4">');
        inList = true;
      }
      processedLines.push('<li class="text-gray-700 dark:text-gray-300">' + line.replace(/^[\-\*] /, '') + '</li>');
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');
  
  // Paragraphs - split by double newlines
  const blocks = html.split('\n\n');
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    
    // Don't wrap headers, lists, or hrs in paragraphs
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<hr') || block.startsWith('</ul>')) {
      return block;
    }
    
    return '<p class="text-gray-700 dark:text-gray-300 mb-4">' + block + '</p>';
  }).join('\n');
  
  return html;
}
