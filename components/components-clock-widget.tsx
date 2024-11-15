'use client'

import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"

interface ClockWidgetProps {
  size?: 'small' | 'medium' | 'large';
  showCalendar?: boolean;
  theme?: 'light' | 'dark';
}

export function ClockWidget({ size = 'medium', showCalendar = true, theme = 'dark' }: ClockWidgetProps) {
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [campaignEndDate] = useState(addDays(new Date(), 30))

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 50)
    return () => clearInterval(timer)
  }, [])

  const secondDegrees = (date.getSeconds() + date.getMilliseconds() / 1000) * 6
  const minuteDegrees = ((date.getMinutes() + date.getSeconds() / 60) / 60) * 360
  const hourDegrees = ((date.getHours() % 12 + date.getMinutes() / 60) / 12) * 360

  const daysLeft = Math.ceil((campaignEndDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="flex flex-col gap-6 p-6 bg-zinc-900 rounded-3xl max-w-3xl">
      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          {/* Clock */}
          <div className="relative w-64 h-64 rounded-full bg-white">
            {/* Clock numbers and second marks */}
            {[...Array(60)].map((_, i) => {
              const rotation = (i / 60) * 360
              const isHour = i % 5 === 0
              return (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {isHour ? (
                    <span
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120px] font-medium text-lg"
                      style={{ transform: `rotate(-${rotation}deg)` }}
                    >
                      {i / 5 || 12}
                    </span>
                  ) : (
                    <div className="absolute top-0 left-1/2 w-0.5 h-2 -translate-x-1/2 bg-gray-300" />
                  )}
                </div>
              )
            })}
            
            {/* Clock hands */}
            <div
              className="absolute top-1/2 left-1/2 w-1 h-16 -ml-[0.5px] -mt-16 bg-black origin-bottom rounded-full"
              style={{ transform: `rotate(${hourDegrees}deg)` }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1 h-24 -ml-[0.5px] -mt-24 bg-black origin-bottom rounded-full"
              style={{ transform: `rotate(${minuteDegrees}deg)` }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-24 -ml-[0.5px] -mt-24 bg-orange-500 origin-bottom transition-transform duration-50"
              style={{ transform: `rotate(${secondDegrees}deg)` }}
            />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-black" />
          </div>

          {/* Digital Date and Time */}
          <div className="text-white flex flex-col gap-2">
            <div className="text-4xl font-bold">
              {format(date, 'HH:mm:ss')}
            </div>
            <div className="text-2xl">
              {format(date, 'MMMM dd, yyyy')}
            </div>
          </div>
        </div>

        {/* Calendar for booking demo */}
        <div className="text-white">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("border-none bg-transparent text-white")}
          />
        </div>
      </div>

      {/* Demo booking and campaign tracking */}
      <div className="flex justify-between items-center">
        <Button onClick={() => alert(`Demo booked for ${format(selectedDate!, 'MMMM dd, yyyy')}`)}>
          Book Demo
        </Button>
        <div className="text-white">
          <span className="font-bold">{daysLeft}</span> days left in campaign
        </div>
      </div>
    </div>
  )
}