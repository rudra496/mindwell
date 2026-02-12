import fs from 'fs';
import path from 'path';

/**
 * Server-side utility to load markdown documents from the project root
 * Used for legal pages, about, etc.
 */
export async function loadDocument(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), filename);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error loading document ${filename}:`, error);
    return '';
  }
}

/**
 * Parse markdown content into sections for FAQ-style display
 */
export function parseMarkdownSections(content: string): Array<{ title: string; content: string }> {
  const sections: Array<{ title: string; content: string }> = [];
  const lines = content.split('\n');
  
  let currentSection: { title: string; content: string } | null = null;
  
  for (const line of lines) {
    // H2 headers (##) start new sections
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: line.replace(/^##\s+/, '').trim(),
        content: ''
      };
    } else if (currentSection) {
      currentSection.content += line + '\n';
    }
  }
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}
