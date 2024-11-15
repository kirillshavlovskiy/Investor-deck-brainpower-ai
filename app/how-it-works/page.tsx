'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ClockWidget } from '@/components/clock-widget'

export default function HowItWorks() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      <h1 className="text-4xl font-bold text-center mb-12">How It Works</h1>
      
      <div className="grid gap-16">
        {/* Section 1: Widget Showcase */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Interactive Widgets</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform offers a variety of interactive widgets that can be easily embedded
              into your applications. From clocks to calendars, each widget is designed
              to be both functional and visually appealing.
            </p>
          </div>
          <div className="flex justify-center">
            <ClockWidget />
          </div>
        </section>

        {/* Section 2: Easy Integration */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <pre className="text-sm text-white overflow-x-auto">
                <code>{`import { ClockWidget } from '@/components/widgets'

export default function MyPage() {
  return (
    <div>
      <ClockWidget />
    </div>
  )
}`}</code>
              </pre>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-4">Simple Integration</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Integrating widgets into your project is straightforward. Just import
              the component you need and place it in your JSX. Our widgets are
              built with React and TypeScript, ensuring type safety and optimal
              performance.
            </p>
          </div>
        </section>

        {/* Section 3: Customization */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Fully Customizable</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Each widget comes with customizable options to match your application's
              design. Adjust colors, sizes, and behaviors through simple prop
              configurations. Our widgets seamlessly adapt to both light and dark themes.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg">
            <pre className="text-sm text-white overflow-x-auto">
              <code>{`<ClockWidget
  theme="dark"
  showSeconds={true}
  size="large"
  showCalendar={true}
/>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </main>
  )
} 