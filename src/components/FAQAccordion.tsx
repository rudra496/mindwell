'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Accordion Component
 * Displays frequently asked questions in an accessible accordion format
 * Uses existing Radix UI accordion from the project
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-full space-y-4"
    >
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset">
              <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {item.question}
              </span>
              <ChevronDown
                className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
