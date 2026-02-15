import { Metadata } from 'next';
import crisisResourcesData from '@/data/crisis-resources.json';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about MindWell mental health platform',
};

type CrisisResource = {
  id: string;
  name: string;
  country: string;
  phone: string;
  textLine: string;
  website: string;
  available: string;
};

export default function FAQPage() {
  const resourcesByCountry = (crisisResourcesData as CrisisResource[]).reduce<Record<string, CrisisResource[]>>((acc, resource) => {
    if (!acc[resource.country]) {
      acc[resource.country] = [];
    }
    acc[resource.country].push(resource);
    return acc;
  }, {});

  const countries = Object.keys(resourcesByCountry).sort((a, b) => a.localeCompare(b));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Crisis Resources by Country
      </h1>

      <div className="space-y-4">
        {countries.map((country) => (
          <details
            key={country}
            className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            <summary className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              {country}
            </summary>

            <div className="px-6 pb-5 pt-2 space-y-4">
              {resourcesByCountry[country].map((resource) => (
                <div key={resource.id} className="rounded-md border border-gray-100 dark:border-slate-700 p-4">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{resource.name}</h2>
                  {resource.phone && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <span className="font-medium">Phone:</span> {resource.phone}
                    </p>
                  )}
                  {resource.textLine && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      <span className="font-medium">Text:</span> {resource.textLine}
                    </p>
                  )}
                  {resource.available && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      <span className="font-medium">Availability:</span> {resource.available}
                    </p>
                  )}
                  {resource.website && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-all">
                      <span className="font-medium">Website:</span>{' '}
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 dark:text-teal-400 hover:underline"
                      >
                        {resource.website}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
