'use client'

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface PaymentCardWidgetProps {
  theme?: 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
}

export function PaymentCardWidget({
  theme = 'dark',
  size = 'medium'
}: PaymentCardWidgetProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showApplePay, setShowApplePay] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const cardSize = {
    small: 'w-80',
    medium: 'w-96',
    large: 'w-[32rem]'
  }[size]

  const textSize = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  }[size]

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment submission
    setTimeout(() => {
      setIsFlipped(false)
      setCardNumber('')
      setExpiry('')
      setCvc('')
    }, 2000)
  }

  return (
    <div className="perspective-1000">
      <motion.div
        className={cn(
          "relative preserve-3d cursor-pointer",
          cardSize
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front - Card Display */}
        <div 
          className="backface-hidden"
          onClick={() => setIsFlipped(true)}
        >
          <div className={cn(
            "aspect-[1.586/1] rounded-2xl relative overflow-hidden",
            theme === 'dark' ? 'bg-gradient-to-br from-zinc-800 to-zinc-900' : 'bg-gradient-to-br from-gray-100 to-white'
          )}>
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-yellow-400 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-yellow-600 rounded-sm" />
                  ))}
                </div>
                <div className={cn(
                  "font-bold tracking-wider",
                  theme === 'dark' ? 'text-white' : 'text-zinc-800'
                )}>
                  VISA
                </div>
              </div>

              {/* Middle Section - Card Number */}
              <div className="flex justify-between px-1">
                {['4929', '1234', '5678', '9012'].map((group, i) => (
                  <div key={i} className={cn(
                    "font-mono tracking-wider",
                    textSize,
                    theme === 'dark' ? 'text-white' : 'text-zinc-800'
                  )}>
                    {group}
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-end">
                <div>
                  <div className={cn(
                    "text-xs mb-1",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    CARD HOLDER
                  </div>
                  <div className={cn(
                    "font-medium tracking-wider",
                    theme === 'dark' ? 'text-white' : 'text-zinc-800'
                  )}>
                    JOHN DOE
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-xs mb-1",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    EXPIRES
                  </div>
                  <div className={cn(
                    "font-medium",
                    theme === 'dark' ? 'text-white' : 'text-zinc-800'
                  )}>
                    12/25
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Payment Form */}
        <div 
          className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cn(
            "aspect-[1.586/1] rounded-2xl p-6",
            theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
          )}>
            <div className="h-full flex flex-col gap-4">
              {!showApplePay ? (
                <>
                  <div className="flex justify-between">
                    <h3 className={cn(
                      "font-bold",
                      theme === 'dark' ? 'text-white' : 'text-zinc-800'
                    )}>
                      Card Payment
                    </h3>
                    <button
                      onClick={() => setShowApplePay(true)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Use Apple Pay
                    </button>
                  </div>
                  <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="rounded-md p-2 border bg-transparent text-white"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="rounded-md p-2 border bg-transparent text-white w-1/2"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="rounded-md p-2 border bg-transparent text-white w-1/2"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Pay Now
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="text-4xl">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
                      <path fill="currentColor" d="M17.178 12.202c-.012-1.2.984-1.774 1.03-1.802-.56-.822-1.436-.935-1.748-.948-1.436-.146-2.797.85-3.52.85-.735 0-1.846-.83-3.036-.807-1.53.023-2.96.897-3.752 2.275-1.613 2.8-.413 6.922 1.143 9.183.77 1.112 1.675 2.356 2.862 2.31 1.152-.046 1.586-.746 2.977-.746 1.378 0 1.776.746 2.977.723 1.23-.023 2.01-1.118 2.756-2.234.885-1.29 1.24-2.545 1.26-2.61-.03-.012-2.415-.927-2.44-3.682-.022-2.3 1.878-3.412 1.962-3.47z"/>
                    </svg>
                  </div>
                  <Button 
                    onClick={() => handlePaymentSubmit}
                    className="bg-black text-white hover:bg-gray-900"
                  >
                    Pay with Apple Pay
                  </Button>
                  <button
                    onClick={() => setShowApplePay(false)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Use Card Instead
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 