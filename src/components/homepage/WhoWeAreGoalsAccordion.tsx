'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SDGSection } from '@/components/SDGSection'

const ABOUT_US_POINTS = [
  'Evidence-based mental health platform',
  'Educational, non-diagnostic',
  'Built with clinical psychology principles',
  'Focus on ethics, safety, accessibility, and transparency',
  'Global-first, inclusive design',
  'Open-source and community-reviewed',
]

const OUR_SERVICES_POINTS = [
  'Mental health education & awareness',
  'Self-reflection tools & assessments',
  'Mood tracking',
  'Therapy techniques & meditation',
  'Psychologist access',
  'Wellbeing games',
  'Community peer support',
  'Publications & media',
]

export function WhoWeAreGoalsAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="w-full space-y-4">
      <Accordion.Item
        value="about-us"
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset">
            <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">About Us</span>
            <ChevronDown
              className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <ul className="px-6 py-4 text-gray-700 dark:text-gray-300 list-disc pl-6 space-y-2">
            {ABOUT_US_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item
        value="our-services"
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset">
            <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">Our Services</span>
            <ChevronDown
              className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <ul className="px-6 py-4 text-gray-700 dark:text-gray-300 list-disc pl-6 space-y-2">
            {OUR_SERVICES_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item
        value="sdg-alignment"
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset">
            <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">SDG Alignment</span>
            <ChevronDown
              className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="px-6 py-4">
            <SDGSection />
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
