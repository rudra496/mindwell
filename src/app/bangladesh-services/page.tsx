import { BangladeshServicesSection } from "@/components/BangladeshServicesSection"

export default function BangladeshServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-teal-900 dark:text-teal-100 mb-6 text-center md:text-left">
        Free Services in Bangladesh 🇧🇩
      </h1>
      <BangladeshServicesSection />
    </div>
  )
}
