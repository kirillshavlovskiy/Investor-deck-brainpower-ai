'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ClockWidget } from './clock-widget'
import { PaymentCardWidget } from './payment-card-widget'
import { ChartWidget } from './chart-widget'
import { X, Play } from 'lucide-react'
import { Button } from './ui/button'
import TextEditorShowcase from './text-editor-showcase'
import { 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Phone, 
  Star, 
  ArrowRight 
} from '@phosphor-icons/react'

export default function LandingPage() {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const problemRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const marketRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const codeExamples = {
    integration: `import { ClockWidget } from '@/components/widgets'

export default function MyPage() {
  return (
    <div>
      <ClockWidget />
    </div>
  )
}`,
    customization: `<ClockWidget
  theme="dark"
  showSeconds={true}
  size="large"
  showCalendar={true}
/>`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Updated Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-sm z-40 border-b border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                BrainPower AI
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollToSection(problemRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection(solutionsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection(marketRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Market
              </button>
              <button
                onClick={() => setShowHowItWorks(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection(problemRef)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Title Section - Updated */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Build Your Digital Presence with Brainpower AI
          </h1>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Create professional websites and landing pages in minutes, not months. 
            Powered by AI, designed for entrepreneurs.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => scrollToSection(problemRef)}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowHowItWorks(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              See how it works
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section - Add ref */}
      <section ref={problemRef} className="container mx-auto px-4 py-20">
        <div className="bg-zinc-800/50 rounded-3xl p-16 mb-16">
          <h2 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            The Problem
          </h2>
          <p className="text-3xl text-gray-300 mb-8 leading-relaxed">
            Despite the digital revolution, <span className="text-purple-400 font-semibold">approximately 40% of small businesses still don't have a website.</span>
          </p>
          <p className="text-2xl text-gray-300 mb-6">
            Current AI backed solutions are either:
          </p>
          <ul className="list-none text-2xl text-gray-300 space-y-6 ml-4">
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-4xl">•</span>
              <span>Too complex for non-technical users</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-4xl">•</span>
              <span>Too basic to be effective and scalable together with business</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-4xl">•</span>
              <span>Too broad, lack focus on real digital business needs</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-4xl">•</span>
              <span>Professional web development remains expensive and time-consuming</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Solutions Section - Add ref */}
      <section ref={solutionsRef} className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Solution</h2>
            <p className="text-xl text-gray-300 mb-8">
              BrainPower AI is the first AI-powered web development platform specifically designed for entrepreneurs and self-employed professionals. Think of it as 'Canva meets Webflow, powered by AI.'
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => setShowHowItWorks(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                See how it works
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ClockWidget />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Product Name</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">New</span>
            </div>
            
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} weight="fill" className="w-5 h-5 text-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">5.0 (24 reviews)</span>
            </div>
            
            <p className="text-gray-600 mb-6">Experience unparalleled quality and innovation with our latest product, designed to elevate your everyday life.</p>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-4xl font-bold text-gray-900">$99.99</span>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105">
                <ShoppingCart weight="bold" className="mr-2" />
                Add to Cart
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center">
                <CreditCard weight="duotone" className="w-6 h-6 text-gray-400 mr-3" />
                <span className="text-gray-700">Secure payment</span>
              </div>
              <div className="flex items-center">
                <Truck weight="duotone" className="w-6 h-6 text-gray-400 mr-3" />
                <span className="text-gray-700">Free shipping worldwide</span>
              </div>
              <div className="flex items-center">
                <Phone weight="duotone" className="w-6 h-6 text-gray-400 mr-3" />
                <span className="text-gray-700">24/7 Dedicated support</span>
              </div>
            </div>
            
            <div className="mt-8">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition duration-300 ease-in-out">
                Learn more about our product
                <ArrowRight weight="bold" className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Add ref */}
      <section ref={featuresRef} className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "AI-Driven Design",
              description: "Create professional landing pages and sales funnels through an intuitive, PowerPoint-like interface"
            },
            {
              title: "Enterprise-Grade Technology",
              description: "Built on Next.js and React, the same technology used by Netflix and Meta"
            },
            {
              title: "Instant Deployment",
              description: "One-click publishing with automatic scaling"
            },
            {
              title: "Built-in Revenue Tools",
              description: "Integrated payment processing and CRM functionality"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-zinc-800/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Section - Add ref */}
      <section ref={marketRef} className="container mx-auto px-4 py-20 border-t border-zinc-800">
        <div className="bg-zinc-800/50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-8">Market Opportunity</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Think of it as:</h3>
              <p className="text-xl text-blue-400 font-semibold mb-6">
                'Canva meets Webflow, powered by AI'
              </p>
              <p className="text-xl text-gray-300">
                We're positioned to capture the massive shift of small businesses going digital,
                serving the needs of 400 million small businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Perfect Timing</h3>
              <p className="text-xl text-gray-300">
                The convergence of AI technology and increasing digital demands creates
                a perfect market opportunity. We're at the forefront of this transformation,
                making professional web development accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Showcase Section - Updated alignment */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Powerful Solutions, One Platform</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-8 flex items-center justify-center mb-6">
              <ClockWidget size="small" showCalendar={false} />
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Smart Interactive Widgets</h3>
              <p className="text-blue-400 font-medium mb-2">
                Add in one click
              </p>
              <p className="text-gray-300">
                Continue editing as a Pro with full customization options
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-8 flex items-center justify-center mb-6">
              <div className="transform scale-110">
                <PaymentCardWidget size="small" />
              </div>
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Seamless Payment Integration</h3>
              <p className="text-blue-400 font-medium mb-2">
                Connect payment systems instantly
              </p>
              <p className="text-gray-300">
                Support multiple payment providers and currencies
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-8 flex items-center justify-center mb-6">
              <ChartWidget size="small" />
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Business Intelligence Hub</h3>
              <p className="text-blue-400 font-medium mb-2">
                Business data analysis & administration
              </p>
              <p className="text-gray-300">
                Including prebuilt sales funnels integration
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-xl text-gray-300">
            All modules are enterprise-ready and fully customizable
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Revolution</h2>
          <Link 
            href="/how-it-works" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-xl font-medium transition-all transform hover:scale-105"
          >
            Transform Your Digital Presence
          </Link>
        </div>
      </section>

      {/* Market Research Section */}
      <section className="container mx-auto px-4 py-20 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Reimagining Web Presence for Small Business
          </h2>

          {/* Market Stats Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-zinc-800/50 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-bold text-blue-400 mb-4">46%</h3>
                <p className="text-2xl text-gray-300">
                  of small businesses don't have a website
                </p>
              </div>
              <div className="mt-8">
                <p className="text-lg text-gray-400 mb-4">Key reasons:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">27%</span>
                    <span className="text-gray-300">say they don't need one</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">26%</span>
                    <span className="text-gray-300">rely on social media only</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">14%</span>
                    <span className="text-gray-300">cite cost as main barrier</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">12%</span>
                    <span className="text-gray-300">lack technical knowledge</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-800/50 rounded-3xl p-8 flex flex-col gap-8">
              <div>
                <h3 className="text-4xl font-bold text-purple-400 mb-4">28%</h3>
                <p className="text-2xl text-gray-300">
                  spend less than $500 on their website
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-purple-400 mb-4">71%</h3>
                <p className="text-2xl text-gray-300">
                  need only 1-10 pages
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-purple-400 mb-4">35%</h3>
                <p className="text-2xl text-gray-300">
                  feel too small for a website
                </p>
              </div>
            </div>
          </div>

          {/* Market Signal Message */}
          <div className="text-center mb-16">
            <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              This isn't a market failure - it's a market signal.
            </p>
          </div>

          {/* Sources */}
          <div className="text-sm text-gray-400 text-center">
            <p className="mb-2">Sources:</p>
            <ul className="space-y-1">
              <li>Top Design Firms' Small Business Survey 2023</li>
              <li>Zippia's Small Business Digital Presence Report 2023</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Make sure the showcase is rendered */}
      <TextEditorShowcase 
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  )
} 