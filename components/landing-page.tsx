'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ClockWidget } from './clock-widget'
import { PaymentCardWidget } from './payment-card-widget'
import { PaymentFormWidget } from './payment-form-widget'
import { ChartWidget } from './chart-widget'
import { Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import { 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Phone, 
  Star, 
  ArrowRight, 
  SquaresFour, 
  Layout, 
  Users, 
  ChartBar, 
  FunnelSimple, 
  Megaphone, 
  ChatCenteredDots, 
  Terminal 
} from '@phosphor-icons/react'

const AppleStyleIcon = ({ 
  Icon, 
  gradient, 
  className 
}: { 
  Icon: React.ElementType, 
  gradient: string,
  className?: string 
}) => (
  <div className={`
    relative w-16 h-16 rounded-2xl 
    flex items-center justify-center
    shadow-lg
    ${gradient}
    ${className}
  `}>
    <Icon className="w-8 h-8 text-white" weight="fill" />
  </div>
);

// Dynamic import for TextEditorShowcase with ssr disabled
const TextEditorShowcase = dynamic(
  () => import('./text-editor-showcase'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
)

export default function LandingPage() {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const problemRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const marketRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const NextSectionButton = ({ targetRef, text = "Next" }: { targetRef: React.RefObject<HTMLDivElement>, text?: string }) => (
    <button
      onClick={() => scrollToSection(targetRef)}
      className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
    >
      {text}
      <ArrowRight weight="bold" className="w-5 h-5" />
    </button>
  );

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
                Market Fit
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
      <section ref={problemRef} className="container mx-auto px-4 py-12">
        <div className="bg-zinc-800/50 rounded-3xl p-16 mb-16">
          <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            The Problem
          </h2>
          <p className="text-2xl text-gray-300 mb-8">
            Current AI backed solutions are either:
          </p>
          <ul className="list-none text-2xl text-gray-300 grid gap-8">
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-3xl">•</span>
              <span>Too complex for non-technical users</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-3xl">•</span>
              <span>Too basic to be effective and scalable together with business</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-3xl">•</span>
              <span>Too broad, lack focus on real digital business needs</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-purple-400 text-3xl">•</span>
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
              <span className="text-purple-400 text-2xl"></span>
              <span>Limited pages but maximum impact like professionally designed and structured Landing page with call to action and sales funnel integration</span>
            </li>
          </ul>
        </div>
        <NextSectionButton targetRef={solutionsRef} text="See Our Solution" />
      </section>

      {/* Solution Section */}
      <section ref={solutionsRef} className="container mx-auto px-4 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Our Solution
          </h2>

          <div className="grid gap-4">
            {/* Top Section */}
            <div className="bg-zinc-800/50 rounded-3xl p-6">
              <div className="flex gap-8 items-start">
                {/* Left side - Value Proposition */}
                <div className="flex-1">
                  <h3 className="text-4xl text-blue-400 font-semibold mb-4">
                    &apos;Canva meets Webflow, powered by AI&apos;
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <p className="text-xl bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 rounded-xl p-4 border border-zinc-700/50">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-semibold">
                        We&apos;re building a revolutionary platform for small businesses and entrepreneurs, 
                        starting at just $500 - making professional web presence accessible to everyone.
                      </span>
                    </p>
                    <ul className="space-y-2 text-lg">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">1.</span>
                        <span>Start with templates designed for your business case</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">2.</span>
                        <span>Add interactive widgets and production-ready components</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">3.</span>
                        <span>Integrate payments and CRM to manage your pipeline</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">4.</span>
                        <span>Leverage AI-driven market analysis and funnel optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right side - Icons Grid */}
                <div className="grid grid-cols-3 gap-2 w-[240px]">
                  {[
                    { icon: Layout, title: "Templates", gradient: "bg-gradient-to-br from-purple-500 to-purple-600" },
                    { icon: SquaresFour, title: "Widgets", gradient: "bg-gradient-to-br from-blue-500 to-blue-600" },
                    { icon: CreditCard, title: "Payments", gradient: "bg-gradient-to-br from-green-500 to-green-600" },
                    { icon: Users, title: "CRM", gradient: "bg-gradient-to-br from-pink-500 to-pink-600" },
                    { icon: ChartBar, title: "Analytics", gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
                    { icon: FunnelSimple, title: "Sales", gradient: "bg-gradient-to-br from-orange-500 to-orange-600" },
                    { icon: Megaphone, title: "Marketing", gradient: "bg-gradient-to-br from-red-500 to-red-600" },
                    { icon: ChatCenteredDots, title: "AI Chat", gradient: "bg-gradient-to-br from-teal-500 to-teal-600" },
                    { icon: Terminal, title: "Code", gradient: "bg-gradient-to-br from-gray-600 to-gray-700" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <AppleStyleIcon 
                        Icon={item.icon} 
                        gradient={item.gradient}
                        className="w-[70px] h-[70px] mb-1 transform hover:rotate-3 transition-transform"
                      />
                      <p className="text-xs font-medium text-gray-300">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section - Two Columns */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left Column - Simple Entry */}
              <div className="bg-zinc-800/50 rounded-3xl p-5">
                <h3 className="text-2xl font-semibold mb-3 text-blue-400">Simple but Powerful</h3>
                <ul className="space-y-2 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Edit like PowerPoint™, deploy like enterprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>AI-powered templates, production-ready from day one</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Professional UI with shadcn, MUI, TailwindCSS & TypeScript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Affordable entry point with unlimited growth potential</span>
                  </li>
                </ul>
              </div>

              {/* Right Column - Enterprise Tech */}
              <div className="bg-zinc-800/50 rounded-3xl p-5">
                <h3 className="text-2xl font-semibold mb-3 text-blue-400">Enterprise Foundation</h3>
                <ul className="space-y-2 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Next.js & React with Docker on AWS premises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Built-in CRM, auth & payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>AI-driven market research & funnel optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400"></span>
                    <span>Pre & post-sale analytics for growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
          
      {/* Diff Features Section */}
      <section ref={featuresRef} className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Key Differentiating Features
          </h2>
          
          {/* Core Value Proposition */}
          <div className="bg-zinc-800/30 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Unlike traditional builders, we offer:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-purple-400 text-2xl">•</span>
                <span className="text-gray-300 text-lg">Start simple, scale seamlessly with a professional tech stack from day one in a background</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-400 text-2xl"></span>
                <span className="text-gray-300 text-lg">AI-assisted content & design creation based on unique market research capabilities powered by best LLMs</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-400 text-2xl">•</span>
                <span className="text-gray-300 text-lg">Integrated business tools & analytics</span>
              </li>
            </ul>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "AI-Driven Design",
                description: "Create professional landing pages and sales funnels through an intuitive, PowerPoint-like interface with AI assistant",
              },
              {
                title: "Enterprise-Grade Tech",
                description: "Built on Next.js and React, optimized for SEO and performance - the same technology used by Netflix and Meta"
              },
              {
                title: "Instant Deployment",
                description: "One-click publishing with automatic scaling, no matter how many clients you have or where they're located"
              },
              {
                title: "Plug-in Tools",
                description: "Integrated payment processing, CRM, and analytics - everything you need to manage your business growth"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-2xl p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <NextSectionButton targetRef={marketRef} text="View Market Fit" />
      </section>
      

      {/* Market Opportunity Section - Updated */}
      <section ref={marketRef} className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Reimagining Web Presence for Small Business
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Market Stats */}
            <div className="bg-zinc-800/50 rounded-3xl p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-blue-400 mb-2">28%</h3>
                  <p className="text-lg text-gray-300">of small businesses invest less than $500 in their website</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-purple-400 mb-2">71%</h3>
                  <p className="text-lg text-gray-300">need only 1-10 pages</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-pink-400 mb-2">35%</h3>
                  <p className="text-lg text-gray-300">feel &quot;too small&quot; for a website</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-blue-400 mb-2">46%</h3>
                  <p className="text-lg text-gray-300">of small businesses still don't have a website in 2023</p>
                </div>
              </div>
            </div>

            {/* Product Market Fit */}
            <div className="bg-zinc-800/50 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">Our Solution Addresses:</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">For the 28% spending under $500:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Premium templates at affordable price points</li>
                    <li>• Professional quality without professional costs</li>
                    <li>• Pay-as-you-grow model</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">For the 71% needing 1-10 pages:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Perfect fit for our template-first approach</li>
                    <li>• All essential pages pre-designed</li>
                    <li>• Easy customization for specific needs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-400 mb-2">For the 35% feeling &quot;too small&quot;:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Start with a single, powerful landing page</li>
                    <li>• Scale only when needed</li>
                    <li>• Professional appearance regardless of size</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Model */}
            <div className="bg-zinc-800/50 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">Business Model Aligned with Market:</h3>
              <div className="space-y-4">
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Entry point under $500 to capture price-sensitive segment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Template-first approach matches real usage patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Scalable pricing that grows with business needs</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-lg text-gray-300 mb-3">
                    We&apos;re building exactly what the market wants:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Simple but professional</li>
                    <li>• Affordable but scalable</li>
                    <li>• Limited pages but maximum impact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Showcase Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Powerful Solutions, One Platform</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Clock Widget */}
          <div className="flex flex-col items-center">
            <ClockWidget size="small" showCalendar={false} />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-semibold mb-3">Smart Interactive Widgets</h3>
              <p className="text-blue-400 font-medium mb-2">Add in one click</p>
              <p className="text-gray-300">Continue editing as a Pro with full customization options</p>
            </div>
          </div>

          {/* Payment Form Widget */}
          <div className="flex flex-col items-center">
            <PaymentFormWidget />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-semibold mb-3">Seamless Payment Integration</h3>
              <p className="text-blue-400 font-medium mb-2">Connect payment systems instantly</p>
              <p className="text-gray-300">Support multiple payment providers and currencies</p>
            </div>
          </div>

          {/* Chart Widget */}
          <div className="flex flex-col items-center">
            <ChartWidget size="small" />
            <div className="text-center mt-8">
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

      {/* Text Editor Showcase */}
      <TextEditorShowcase 
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  )
} 