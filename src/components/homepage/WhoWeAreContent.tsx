"use client"

/**
 * Section 2: Who We Are / What We Offer
 */
export function WhoWeAreContent() {
  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        MindWell is the <strong>world's largest free mental health support platform</strong>, providing comprehensive, evidence-based mental health resources to everyone, everywhere.
      </p>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Our mission is to make professional-quality mental health support accessible worldwide, free of charge. We believe mental health care is a fundamental human right.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">24/7</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
        </div>
        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">100%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
        </div>
        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">Global</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Access</p>
        </div>
      </div>
    </div>
  )
}
