'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ClockWidget } from './clock-widget'
import { PaymentCardWidget } from './payment-card-widget'
import { ChartWidget } from './chart-widget'
import { Play } from 'lucide-react'
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
              <Link 
                href="/how-it-works"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <button
                onClick={() => setShowHowItWorks(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Playground
              </button>
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
            <Link
              href="/how-it-works"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              How It Works
            </Link>
            <button
              onClick={() => setShowHowItWorks(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Try Playground
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemRef} className="container mx-auto px-4 py-20">
        <div className="bg-zinc-800/50 rounded-3xl p-16 mb-16">
          <h2 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            The Problem
          </h2>
          <p className="text-3xl text-gray-300 mb-8 leading-relaxed">
            Despite the digital revolution, <span className="text-purple-400 font-semibold">approximately 40% of small businesses still don&apos;t have a website.</span>
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

        {/* What Entrepreneurs Need Section */}
        <div className="bg-zinc-800/50 rounded-3xl p-16">
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            What Entrepreneurs Need
          </h2>
          <ul className="space-y-6 text-xl text-gray-300">
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Price-sensitive segment: Entry point under $500</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Template-first approach matches for non-technical people</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Scalable pricing that grows with business needs. Pay as you go approach</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Website should be simple but professionally developed</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Affordable but scalable to follow business growth</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl">•</span>
              <span>Limited pages but maximum impact like professionally designed and structured Landing page with call to action and sales funnel integration</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionsRef} className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Our Solution
          </h2>

          {/* Solution Description */}
          <div className="bg-zinc-800/50 rounded-3xl p-8 mb-16">
            <p className="text-3xl text-blue-400 font-semibold mb-6">
              &apos;Canva meets Webflow, powered by AI&apos;
            </p>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;re positioned to capture the massive shift of small businesses going digital, 
              serving the needs of 400 million small businesses worldwide.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="bg-zinc-800/50 rounded-3xl p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6">Unlike traditional builders, we offer:</h3>
            <ul className="space-y-4 text-lg text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>Start simple, scale seamlessly with a professional tech stack from day one in a background</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>AI-assisted content & design creation based on unique market research capabilities powered by best LLMs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>Integrated business tools & analytics</span>
              </li>
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* PowerPoint-Simple Entry */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">PowerPoint-Simple Entry</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Edit like PowerPoint, deploy like enterprise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>AI-powered templates production ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Built-in professional design principles: shadcn and MUI UI libraries preinstalled, TailwindCSS and TypeScript based</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Foundation */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Enterprise Foundation</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Next.js & React with Docker containerization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Built-in CRM, Authorization, and payment processing out of the box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>AI-driven market research, SEO, Copywriting and sales funnel optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
          
      {/* Diff Features Section - Add ref */}
      <section ref={featuresRef} className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Key Differentiating Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "AI-Driven Design",
              description: "Create professional landing pages and sales funnels through an intuitive, PowerPoint-like interface with AI assistant ready to step in and advise on your design or process flow improvements",
            },
            {
              title: "Enterprise-Grade Technology",
              description: "Built on Next.js and React, optimized for SEO and Landing pages - the same technology used by Netflix and Meta"
            },
            {
              title: "Instant Deployment",
              description: "One-click publishing with automatic scaling: no matter how many clients you have or where they are located, we will take care about this optimization"
            },
            {
              title: "Plug-in Tools",
              description: "Integrated payment solution, seamless account opening and CRM integration, everything you need to focus on closing deals with your clients and manage prospect customer pipeline"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-zinc-800/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* Market Opportunity Section - Updated */}
      <section ref={marketRef} className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Market Opportunity
          </h2>

          {/* Market Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-zinc-800/50 rounded-3xl p-8">
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>46% of small businesses potentially need websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Growing freelance economy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Increasing demand for professional web presence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Rising cost of traditional web development</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Think of it as:</h3>
              <p className="text-xl text-blue-400 font-semibold mb-6">
                &apos;Canva meets Webflow, powered by AI&apos;
              </p>
              <p className="text-xl text-gray-300">
                We&apos;re positioned to capture the massive shift of small businesses going digital,
                serving the needs of 400 million small businesses worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Showcase Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Powerful Solutions, One Platform</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Clock Widget Card */}
          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-6 mb-6 flex items-center justify-center">
              <ClockWidget size="small" showCalendar={false} />
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Smart Interactive Widgets</h3>
              <p className="text-blue-400 font-medium mb-2">Add in one click</p>
              <p className="text-gray-300">Continue editing as a Pro with full customization options</p>
            </div>
          </div>

          {/* Payment Widget Card */}
          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-6 mb-6 flex items-center justify-center">
              <PaymentCardWidget size="small" />
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Seamless Payment Integration</h3>
              <p className="text-blue-400 font-medium mb-2">Connect payment systems instantly</p>
              <p className="text-gray-300">Support multiple payment providers and currencies</p>
            </div>
          </div>

          {/* Chart Widget Card */}
          <div className="flex flex-col">
            {/* Widget Container - Increased height */}
            <div className="h-[400px] bg-zinc-800/50 rounded-3xl p-6 mb-6 flex items-center justify-center">
              <ChartWidget size="small" />
            </div>
            {/* Text Container */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3">Business Intelligence Hub</h3>
              <p className="text-blue-400 font-medium mb-2">Business data analysis & administration</p>
              <p className="text-gray-300">Including prebuilt sales funnels integration</p>
            </div>
          </div>
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
            <div className="bg-zinc-800/50 rounded-3xl p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-blue-400 mb-2">46%</h3>
                  <p className="text-xl text-gray-300">of small businesses don&apos;t have a website</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-purple-400 mb-2">71%</h3>
                  <p className="text-xl text-gray-300">need only 1-10 pages</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-pink-400 mb-2">35%</h3>
                  <p className="text-xl text-gray-300">feel &quot;too small&quot; for a website</p>
                </div>
              </div>
            </div>

            {/* Product Market Fit */}
            <div className="bg-zinc-800/50 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Our Solution Directly Addresses:</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-400 mb-2">For the 28% spending under $500:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Premium templates at affordable price points</li>
                    <li>• Professional quality without professional costs</li>
                    <li>• Pay-as-you-grow model</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-purple-400 mb-2">For the 71% needing 1-10 pages:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Perfect fit for our template-first approach</li>
                    <li>• All essential pages pre-designed</li>
                    <li>• Easy customization for specific needs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-pink-400 mb-2">For the 35% feeling &quot;too small&quot;:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Start with a single, powerful landing page</li>
                    <li>• Scale only when needed</li>
                    <li>• Professional appearance regardless of size</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Business Model */}
          <div className="bg-zinc-800/50 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Business Model Aligned with Market:</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Entry point under $500 to capture price-sensitive segment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Template-first approach matches real usage patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">•</span>
                  <span>Scalable pricing that grows with business needs</span>
                </li>
              </ul>
              <div>
                <p className="text-xl text-gray-300 mb-4">
                  We&apos;re not trying to change the market - we&apos;re building exactly what it&apos;s asking for:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Simple but professional</li>
                  <li>• Affordable but scalable</li>
                  <li>• Limited pages but maximum impact</li>
                </ul>
              </div>
            </div>
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