'use client'

import { useState } from 'react'
import { ClockWidget } from './clock-widget'
import TextEditorShowcase from './text-editor-showcase'
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'

export function ScheduleSection() {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  return (
    <section className="min-h-screen bg-black py-20">
      <div className="container mx-auto">
        <div className="flex gap-12 items-start justify-center">
          <ClockWidget />
          
          <div className="flex flex-col gap-6 max-w-[600px]">
            <h2 className="text-5xl font-bold text-white">
              Our Solution
            </h2>
            <div className="text-xl text-white">
              BrainPower AI is the first AI-powered web development platform specifically designed for entrepreneurs and self-employed professionals. Think of it as 'Canva meets Webflow, powered by AI.'
            </div>
            <Button
              onClick={() => setShowHowItWorks(true)}
              variant="outline"
              size="lg"
              className="w-fit group"
            >
              <Play className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
              See how it works
            </Button>
          </div>
        </div>
      </div>

      <TextEditorShowcase 
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </section>
  )
} 