'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowDown, ArrowUp } from 'lucide-react'
import { ClockWidget } from '@/components/clock-widget'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sections = [
  {
    id: 'widgets',
    title: 'Interactive Widgets',
    description: 'Our platform offers a variety of interactive widgets that can be easily embedded into your applications. From clocks to calendars, each widget is designed to be both functional and visually appealing.',
    code: `import { ClockWidget } from '@/components/widgets'

export default function MyPage() {
  return (
    <div>
      <ClockWidget />
    </div>
  )
}`,
    demo: <ClockWidget />
  },
  {
    id: 'integration',
    title: 'Simple Integration',
    description: 'Integrating widgets into your project is straightforward. Just import the component you need and place it in your JSX. Our widgets are built with React and TypeScript, ensuring type safety and optimal performance.',
    code: `<ClockWidget
  theme="dark"
  showSeconds={true}
  size="large"
  showCalendar={true}
/>`
  },
  {
    id: 'customization',
    title: 'Fully Customizable',
    description: 'Each widget comes with customizable options to match your application\'s design. Adjust colors, sizes, and behaviors through simple prop configurations. Our widgets seamlessly adapt to both light and dark themes.',
    code: `// Deploy with authentication and payments
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

export default async function Page() {
  const user = await auth()
  const subscription = await stripe.subscriptions.retrieve(
    user.subscriptionId
  )

  return (
    <ProtectedWidget 
      user={user}
      subscription={subscription}
    />
  )
}`
  }
]

export default function HowItWorks() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group z-50"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      {/* Section Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSection === index ? "bg-white scale-150" : "bg-gray-500 hover:bg-gray-400"
            )}
          />
        ))}
      </div>

      {/* Sections */}
      <div 
        className="transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {sections.map((section, index) => (
          <section 
            key={section.id}
            className="h-screen w-screen flex items-center justify-center p-16"
          >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
                <p className="text-xl text-gray-300 mb-8">
                  {section.description}
                </p>
                <div className="bg-zinc-800 p-6 rounded-lg">
                  <pre className="text-sm text-white overflow-x-auto">
                    <code>{section.code}</code>
                  </pre>
                </div>
              </div>
              {section.demo && (
                <div className="flex justify-center">
                  {section.demo}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <Button
          variant="outline"
          onClick={goToPrevSection}
          disabled={currentSection === 0}
          className="group"
        >
          <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
          Previous
        </Button>
        <Button
          onClick={goToNextSection}
          disabled={currentSection === sections.length - 1}
          className="group"
        >
          Next
          <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </main>
  )
} 