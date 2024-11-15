'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, Calendar, MessageSquare, Play, CheckCircle2, AlertCircle, Command, Zap, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const sections = ['hero', 'solution', 'advantages', 'user-story', 'product-market-fit', 'technical-details', 'competitive-landscape', 'team', 'cta']

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = 0

      sectionRefs.current.forEach((ref, index) => {
        if (ref && pageYOffset >= ref.offsetTop - 50) {
          newActiveSection = index
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirmDateTime = () => {
    if (selectedDate && selectedTime) {
      setIsCalendarOpen(false)
      setIsConfirmationOpen(true)
    }
  }

  const handleConfirmBooking = () => {
    setTimeout(() => {
      setIsConfirmationOpen(false)
      setBookingStatus(`Demo booked for ${selectedDate?.toLocaleDateString()} at ${selectedTime}`)
      setSelectedDate(null)
      setSelectedTime('')
    }, 1000)
  }

  const handleBookDemo = () => {
    if (name && email) {
      setIsCalendarOpen(true)
    } else {
      setError('Please enter your name and email before booking a demo.')
    }
  }

  const handleStayInTouch = () => {
    if (name && email) {
      setTimeout(() => {
        setBookingStatus(`Thank you, ${name}! We'll keep you updated on our latest news and offers.`)
      }, 1000)
    } else {
      setError('Please enter your name and email to stay in touch.')
    }
  }

  const availableTimes = ['09:00', '11:00', '13:00', '15:00', '17:00']

  return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Brainpower AI</Link>
              <div className="space-x-4">
                {sections.slice(1).map((section, index) => (
                    <Button key={section} variant="ghost" onClick={() => scrollToSection(index + 1)}>
                      {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Button>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section ref={el => sectionRefs.current[0] = el} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
            <div className="text-center">
              <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl font-bold mb-6"
              >
                Welcome to Brainpower AI
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl mb-8"
              >
                Revolutionizing business with AI-powered solutions
              </motion.p>
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button onClick={() => scrollToSection(1)} size="lg">
                  Explore Our Solution <ArrowDown className="ml-2" />
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section ref={el => sectionRefs.current[1] = el} className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Our Solution</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">AI-Powered Business Facilitation</h3>
                  <p className="mb-4">Brainpower AI offers a seamless and boundless way of digital business facilitation, backed by cutting-edge AI technologies. Our platform provides an intuitive and simple interface to create web apps, sites, and products, along with comprehensive business support and administrative infrastructure.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Automatic operational account opening</li>
                    <li>Instant sub-legal entity creation</li>
                    <li>AI-driven digital asset creation (logos, landing pages)</li>
                    <li>Integrated sales funnels and automated workflows</li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img src="/placeholder.svg?height=300&width=400" alt="AI Business Facilitation" className="rounded-lg shadow-lg" />
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Fully Prompt-Based Digital Business Management</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Command className="mr-2" /> Command Center
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Manage your entire digital business using natural language prompts. From creating marketing campaigns to analyzing sales data, our AI understands and executes your commands.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-2" /> Instant Execution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Experience lightning-fast implementation of your ideas. Our AI translates your prompts into actionable tasks and executes them in real-time, dramatically reducing time-to-market.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sparkles className="mr-2" /> AI-Powered Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Let our AI continuously optimize your business processes. It learns from your prompts and business performance, suggesting improvements and implementing best practices automatically.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(2)} size="lg">
                  See Our Advantages <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section ref={el => sectionRefs.current[2] = el} className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Competitive Advantages</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Rapid Time-to-Market</h3>
                  <p>Decrease time-to-market for digital products with our fully integrated, AI-managed platform.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">End-to-End AI Management</h3>
                  <p>From business idea to deployed solution, our AI guides you through every step of the process.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Tailored Compliance</h3>
                  <p>Ensure legal compliance with AI-driven solutions tailored to your target market or country.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Prompt-Based Business Management</h3>
                  <p>Enjoy a fully prompt-based way to manage your digital business, streamlining operations and decision-making processes.</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(3)} size="lg">
                  See User Story <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* User Story Section */}
          <section ref={el => sectionRefs.current[3] = el} className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-3xl font-bold mb-6 text-center">User Story</h2>
              <p className="text-lg mb-8 text-center">Experience the power of AI-driven business facilitation with this real-world example:</p>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Creating a Landing Page for DigitalBoost Pro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-semibold">You: I need a landing page for my new digital marketing agency, DigitalBoost Pro.</p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-semibold">Brainpower AI: Great! Let's gather some information about your business. What services do you offer, who is your target audience, and what sets you apart?</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-semibold">You: We offer SEO, PPC, social media, and content marketing for B2B tech companies. Our unique selling point is AI-driven analytics for real-time ROI tracking.</p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-semibold">Brainpower AI: Based on your input, I've created a landing page prototype. It includes a hero section, services overview, unique selling proposition, and a call-to-action. You can now view and edit it in the web interface.</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-semibold">You: The prototype looks good, but can we add a section showcasing our past client results?</p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-semibold">Brainpower AI: I've added a "Client Success Stories" section with three case study cards. You can now edit the specific details directly in the web interface.</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-semibold">You: Great! Now, can you suggest some marketing strategies to promote this landing page?</p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-semibold">Brainpower AI: Here are some strategies to consider:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>LinkedIn Advertising targeting B2B tech companies</li>
                      <li>Google Ads for relevant keywords</li>
                      <li>Content marketing with AI-focused blog posts</li>
                      <li>Email campaigns to tech industry contacts</li>
                      <li>Webinars on digital marketing trends</li>
                    </ul>
                    <p className="mt-2">I recommend A/B testing, using UTM parameters, and implementing conversion tracking to measure effectiveness. Would you like a detailed marketing plan?</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-lg font-semibold mb-4">Ready to transform your digital business?</p>
                <Button onClick={() => scrollToSection(4)} size="lg">
                  Explore Product Market Fit <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Product Market Fit Section */}
          <section ref={el => sectionRefs.current[4] = el} className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Product-Market Fit</h2>
              <Tabs defaultValue="why" className="max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="why">Why We Believe</TabsTrigger>
                  <TabsTrigger value="target">Target Market</TabsTrigger>
                  <TabsTrigger value="differentiators">Main Differentiators</TabsTrigger>
                </TabsList>
                <TabsContent value="why" className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Why We Believe in Product-Market Fit</h3>
                  <p className="text-lg mb-4">
                    We believe in the best product-market fit now because of the increasing demand for solutions that decrease time to market, improve business efficiency, and open market access—all powered by artificial intelligence technology taking a leading role in supporting businesses and communities in delivering the best solutions for clients and society.
                  </p>
                  <p className="text-lg">
                    Equipped with cutting-edge technologies for creating full-stack web apps on React using simple prompts and instructions, our LLM model is specifically developed for web product creation. This allows us to rapidly prototype and deploy sophisticated web applications, meeting the evolving needs of businesses in the digital age.
                  </p>
                </TabsContent>
                <TabsContent value="target" className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Target Market</h3>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>Small business owners seeking to establish an online presence</li>
                    <li>Digital marketing teams looking for integrated, AI-driven solutions</li>
                    <li>Product teams seeking business growth facilitation and rapid prototyping</li>
                    <li>Entrepreneurs launching new market products with limited technical resources</li>
                    <li>Businesses lacking technical knowledge and access to software engineers</li>
                    <li>Startups aiming to quickly validate and iterate on their product ideas</li>
                  </ul>
                </TabsContent>
                <TabsContent value="differentiators" className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Main Differentiators</h3>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>Significantly decreased time-to-market for digital products</li>
                    <li>Fully integrated sales funnel and automated workflow out-of-the-box</li>
                    <li>End-to-end AI management from business idea to deployed solution</li>
                    <li>Legally compliant processes tailored for target markets</li>
                    <li>AI-driven full-stack web app creation using simple prompts</li>
                    <li>Seamless integration of cutting-edge React-based technologies</li>
                    <li>Continuous learning and adaptation to emerging web development trends</li>
                  </ul>
                </TabsContent>
              </Tabs>
              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(5)} size="lg">
                  View Technical Details <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Technical Details Section */}
          <section ref={el => sectionRefs.current[5] = el} className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Technical Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Cutting-Edge Technology Stack</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Built with Next.js for optimal performance and SEO</li>
                    <li>SEO optimized out of the box</li>
                    <li>Supported by industry-leading typography and styling presets</li>
                    <li>Designed to fit modern digital marketing concepts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Comprehensive Server Solutions</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Robust database management</li>
                    <li>Integrated CRM functionality</li>
                    <li>Capability to run process automation scripts</li>
                    <li>Reserved computational space for complex web app needs</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(6)} size="lg">
                  Explore Competitive Landscape <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Competitive Landscape Section */}
          <section ref={el => sectionRefs.current[6] = el} className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Competitive Landscape</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl mb-6 text-center">
                  Brainpower AI's solution is an all-in-one, out-of-the-box approach for business facilitation backed by AI. We differentiate ourselves from general web app AI-powered creation platforms and sales facilitation solutions by providing a fully dedicated and focused solution for digital product, marketing, and sales with end-to-end seamless integration to start and administrate business on the go.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Web App Creation Platforms</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Cursor</li>
                      <li>V0</li>
                      <li>Replit</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Sales Facilitation Solutions</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>GoHighLevel</li>
                      <li>ClickFunnels</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Integration Platforms</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Zapier</li>
                    <li>Make.com</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(7)} size="lg">
                  Meet Our Team <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section ref={el => sectionRefs.current[7] = el} className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-4xl font-bold mb-8 text-center">Our Team</h2>
              <p className="text-xl text-center mb-8">Meet the experts behind Brainpower AI. Our team combines years of experience in AI, business development, and digital marketing to bring you cutting-edge solutions.</p>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((member) => (
                    <div key={member} className="bg-white p-6 rounded-lg shadow-md text-center">
                      <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold mb-2">Team Member {member}</h3>
                      <p className="text-gray-600">Position</p>
                    </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => scrollToSection(8)} size="lg">
                  Get Started <ArrowDown className="ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section ref={el => sectionRefs.current[8] = el} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50">
            <div className="container mx-auto px-6 py-12 text-center">
              <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8">Experience the power of AI-driven business facilitation with Brainpower AI.</p>
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>Enter your details to book a demo or stay updated.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" onClick={handleBookDemo}>
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Book a Demo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" onClick={handleStayInTouch}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Stay in Touch</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="https://platform.brainpower-ai.com" target="_blank" rel="noopener noreferrer">
                          <Button size="icon">
                            <Play className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Explore Platform</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold">Brainpower AI</h3>
                <p>Empowering businesses with intelligent solutions</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
                <Link href="/contact" className="hover:text-blue-300">Contact Us</Link>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; 2024 Brainpower AI. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select a Date and Time for Your Demo</DialogTitle>
              <DialogDescription>
                Choose from available dates in the next 7 days (excluding weekends) and select a time slot.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      minDate={new Date()}
                      className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Select onValueChange={handleTimeSelect} value={selectedTime}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleConfirmDateTime} disabled={!selectedDate || !selectedTime}>
                Confirm Date and Time
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Your Demo Booking</DialogTitle>
              <DialogDescription>
                You're about to book a demo call for:
                {selectedDate && selectedTime && (
                    <p className="font-semibold mt-2">
                      {selectedDate.toLocaleDateString()} at {selectedTime}
                    </p>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {bookingStatus && (
            <Alert className="fixed bottom-4 right-4 max-w-md">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{bookingStatus}</AlertDescription>
            </Alert>
        )}

        {error && (
            <Alert className="fixed bottom-4 right-4 max-w-md" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </div>
  )
}