'use client'

import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { motion } from "framer-motion"

interface TimePickerProps {
  onTimeSelect: (time: string) => void
  theme?: 'light' | 'dark'
}

function TimePicker({ onTimeSelect, theme = 'dark' }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState('12')
  const [selectedMinute, setSelectedMinute] = useState('00')

  const hours = Array.from({ length: 9 }, (_, i) => 
    (i + 9).toString().padStart(2, '0')
  )
  
  const minutes = ['00', '15', '30', '45']

  useEffect(() => {
    onTimeSelect(`${selectedHour}:${selectedMinute}`)
  }, [selectedHour, selectedMinute, onTimeSelect])

  return (
    <div className="flex gap-2 justify-center">
      {/* Hours */}
      <div className="relative w-16 h-24 overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            "bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900"
          )}
        />
        <div className="h-full overflow-auto scrollbar-hide">
          <div className="py-10">
            {hours.map((hour) => (
              <div
                key={hour}
                className={cn(
                  "h-8 flex items-center justify-center cursor-pointer transition-colors",
                  hour === selectedHour 
                    ? "text-white text-lg font-bold"
                    : "text-gray-500 hover:text-gray-300"
                )}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-white text-2xl flex items-center">:</div>

      {/* Minutes */}
      <div className="relative w-16 h-24 overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            "bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900"
          )}
        />
        <div className="h-full overflow-auto scrollbar-hide">
          <div className="py-10">
            {minutes.map((minute) => (
              <div
                key={minute}
                className={cn(
                  "h-8 flex items-center justify-center cursor-pointer transition-colors",
                  minute === selectedMinute 
                    ? "text-white text-lg font-bold"
                    : "text-gray-500 hover:text-gray-300"
                )}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ClockWidgetProps {
  size?: 'small' | 'medium' | 'large';
  showCalendar?: boolean;
}

export function ClockWidget({ size = 'medium', showCalendar = true }: ClockWidgetProps) {
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [campaignEndDate] = useState(addDays(new Date(), 30))
  const [isFlipped, setIsFlipped] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 50)
    return () => clearInterval(timer)
  }, [])

  const secondDegrees = (date.getSeconds() + date.getMilliseconds() / 1000) * 6
  const minuteDegrees = (date.getMinutes() * 6) + (secondDegrees / 60)
  const hourDegrees = ((date.getHours() % 12) * 30) + (minuteDegrees / 12)

  const daysLeft = Math.ceil((campaignEndDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate && time) {
      setShowConfirmation(true)
      setTimeout(() => {
        setIsFlipped(false)
        setShowConfirmation(false)
        setSelectedTime('')
        setSelectedDate(undefined)
      }, 2000)
    }
  }

  return (
    <div className="perspective-1000">
      <motion.div
        className="relative preserve-3d cursor-pointer w-[320px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front - Clock Face */}
        <div 
          className="backface-hidden"
          onClick={() => setIsFlipped(true)}
        >
          <div className="flex flex-col gap-6 p-6 bg-zinc-900 rounded-3xl">
            <div className="flex gap-6">
              <div className="flex flex-col gap-6">
                {/* Clock */}
                <div className="relative w-64 h-64 rounded-full bg-white">
                  {/* Clock numbers and marks */}
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
                          <>
                            <span
                              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[110px] font-bold text-xl"
                              style={{ transform: `rotate(-${rotation}deg)` }}
                            >
                              {i === 0 ? '12' : i / 5}
                            </span>
                            <div className="absolute top-0 left-1/2 w-1 h-3 -translate-x-1/2 bg-black" />
                          </>
                        ) : (
                          <div 
                            className={cn(
                              "absolute top-0 left-1/2 w-0.5 -translate-x-1/2",
                              i % 5 === 0 ? "h-3 bg-black" : "h-2 bg-gray-300"
                            )}
                          />
                        )}
                      </div>
                    )
                  })}
                  
                  {/* Clock hands with smooth transitions */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-1.5 h-16 -ml-[0.75px] -mt-16 bg-black origin-bottom rounded-full"
                    style={{ rotate: hourDegrees }}
                    transition={{ duration: 0.05 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-1 h-24 -ml-[0.5px] -mt-24 bg-black origin-bottom rounded-full"
                    style={{ rotate: minuteDegrees }}
                    transition={{ duration: 0.05 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-0.5 h-24 -ml-[0.25px] -mt-24 bg-orange-500 origin-bottom"
                    style={{ rotate: secondDegrees }}
                    transition={{ duration: 0.05, ease: "linear" }}
                  />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-black" />
                </div>

                {/* Days Left Counter */}
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{daysLeft} days left</div>
                  <div className="text-sm">Click to book demo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Calendar */}
        <div 
          className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180"
        >
          <div className="flex flex-col p-6 bg-zinc-900 rounded-3xl">
            <div 
              className="absolute inset-0 rounded-3xl"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.calendar-container')) {
                  !showConfirmation && setIsFlipped(false);
                }
              }}
            />
            <div className="relative calendar-container">
              {!showConfirmation ? (
                <div className="flex flex-col gap-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="border-none bg-transparent text-white"
                    classNames={{
                      months: "space-y-4 w-full",
                      month: "space-y-4 w-full",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex w-full",
                      head_cell: "text-zinc-400 w-9 font-normal text-[0.8rem] text-center",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm relative p-0 [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-9",
                      day: "h-9 w-9 p-0 font-normal text-white aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-colors",
                      day_selected: "bg-white text-zinc-900 hover:bg-white hover:text-zinc-900 focus:bg-white focus:text-zinc-900 rounded-md",
                      day_today: "bg-zinc-800 text-white rounded-md",
                      day_outside: "text-zinc-400 opacity-50",
                      day_disabled: "text-zinc-400 opacity-50",
                      day_hidden: "invisible",
                    }}
                  />
                  {selectedDate && (
                    <div className="relative z-10" onClick={e => e.stopPropagation()}>
                      <TimePicker
                        onTimeSelect={handleTimeSelect}
                        theme="dark"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-xl font-bold">Demo Scheduled!</div>
                    <div className="mt-2">
                      {format(selectedDate!, 'MMMM dd, yyyy')}
                      <br />
                      {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 