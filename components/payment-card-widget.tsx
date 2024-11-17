'use client'

import React, { useState, useEffect } from 'react'
import { PaymentFormWidget } from './payment-form-widget'

interface PaymentCardWidgetProps {
  size?: 'small' | 'medium' | 'large'
}

export function PaymentCardWidget({ size = 'medium' }: PaymentCardWidgetProps) {
  const [isRotated, setIsRotated] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsRotated(prev => !prev)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative perspective-1000">
      <div
        className={`
          transform-style-3d transition-transform duration-1000
          ${isRotated ? 'rotate-y-180' : ''}
        `}
      >
        {/* Front - Credit Card */}
        <div className={`
          absolute backface-hidden
          ${isRotated ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-500
        `}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-xl w-[400px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-md" />
                <div className="text-white text-lg">VISA</div>
              </div>
              <div className="text-gray-300 text-lg tracking-wider">
                4242 4242 4242 4242
              </div>
              <div className="flex justify-between text-gray-400">
                <div>JOHN DOE</div>
                <div>12/25</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Payment Form */}
        <div className={`
          absolute backface-hidden rotate-y-180
          ${isRotated ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-500
        `}>
          <PaymentFormWidget />
        </div>
      </div>
    </div>
  )
} 