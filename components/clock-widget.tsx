'use client'

import React, { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { motion } from "framer-motion"
import { commonButtonStyles } from "@/components/common/button-styles"

interface Appointment {
  date: Date;
  time: string;
  title: string;
}

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
      <div className="relative w-16 h-24 overflow-hidden rounded-xl border border-zinc-800">
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
                    ? "text-blue-400 text-lg font-bold"
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
      <div className="relative w-16 h-24 overflow-hidden rounded-xl border border-zinc-800">
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
                    ? "text-blue-400 text-lg font-bold"
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

interface TimeSlot {
  time: string;
  available: boolean;
}

function DayView({ selectedDate, onTimeSelect }: { 
  selectedDate: Date; 
  onTimeSelect: (time: string) => void;
}) {
  const hours = Array.from({ length: 9 }, (_, i) => i + 9) // 9 AM to 5 PM
  const existingMeetings = [
    { time: '10:00', duration: 60, title: 'Team Meeting' },
    { time: '14:30', duration: 30, title: 'Client Call' },
  ]

  const getTimeSlotPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return (hours - 9) * 60 + minutes
  }

  const getTimeSlotHeight = (duration: number) => {
    return (duration / 60) * 60 // 60px per hour
  }

  return (
    <div className="w-[300px] h-[300px] bg-zinc-800/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700 bg-zinc-800">
        <div className="text-lg font-medium text-white text-center">
          {format(selectedDate, 'EEEE, MMMM d')}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-[calc(100%-64px)] overflow-y-auto">
        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-zinc-700 bg-zinc-800/50">
          {hours.map(hour => (
            <div 
              key={hour} 
              className="h-[60px] flex items-start justify-center pt-1 text-xs text-gray-400"
            >
              {format(new Date().setHours(hour, 0), 'ha')}
            </div>
          ))}
        </div>

        {/* Time slots grid */}
        <div className="ml-12 relative">
          {/* Hour lines */}
          {hours.map(hour => (
            <div 
              key={hour}
              className="h-[60px] border-b border-zinc-700/50 relative"
            >
              {/* 30-minute marker */}
              <div className="absolute top-1/2 left-0 right-0 border-b border-zinc-700/30" />
            </div>
          ))}

          {/* Existing meetings */}
          {existingMeetings.map((meeting, index) => (
            <div
              key={index}
              className="absolute left-1 right-1 bg-blue-500/20 border-l-2 border-blue-500 rounded-r-md"
              style={{
                top: `${getTimeSlotPosition(meeting.time)}px`,
                height: `${getTimeSlotHeight(meeting.duration)}px`
              }}
            >
              <div className="p-2">
                <div className="text-xs font-medium text-blue-400">{meeting.title}</div>
                <div className="text-xs text-gray-400">
                  {format(new Date(`2000-01-01T${meeting.time}`), 'h:mm a')}
                </div>
              </div>
            </div>
          ))}

          {/* Available slots */}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              {[0, 30].map(minutes => {
                const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                const isAvailable = !existingMeetings.some(meeting => {
                  const meetingStart = getTimeSlotPosition(meeting.time)
                  const meetingEnd = meetingStart + getTimeSlotHeight(meeting.duration)
                  const currentPosition = getTimeSlotPosition(time)
                  return currentPosition >= meetingStart && currentPosition < meetingEnd
                })

                return isAvailable && (
                  <button
                    key={`${hour}-${minutes}`}
                    onClick={() => onTimeSelect(time)}
                    className="absolute left-1 right-1 h-[30px] group"
                    style={{
                      top: `${getTimeSlotPosition(time)}px`,
                    }}
                  >
                    <div className="hidden group-hover:block absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded">
                      <div className="p-1 text-xs text-blue-400">
                        {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                      </div>
                    </div>
                  </button>
                )
              })}
            </React.Fragment>
          ))}
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
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isFlipped, setIsFlipped] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showAppointments, setShowAppointments] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 50)
    return () => clearInterval(timer)
  }, [])

  const secondDegrees = (date.getSeconds() + date.getMilliseconds() / 1000) * 6
  const minuteDegrees = (date.getMinutes() * 6) + (secondDegrees / 60)
  const hourDegrees = ((date.getHours() % 12) * 30) + (minuteDegrees / 12)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate && time) {
      const newAppointment = {
        date: selectedDate,
        time: time,
        title: "Product Demo Call"
      }
      setAppointments([...appointments, newAppointment])
      setShowConfirmation(true)
      setTimeout(() => {
        setIsFlipped(false)
        setShowConfirmation(false)
        setSelectedTime('')
        setSelectedDate(undefined)
        setShowAppointments(true)
      }, 2000)
    }
  }

  const nextAppointment = appointments.length > 0 
    ? appointments.reduce((closest, current) => {
        const currentDate = new Date(current.date)
        currentDate.setHours(parseInt(current.time.split(':')[0]))
        currentDate.setMinutes(parseInt(current.time.split(':')[1]))
        
        const closestDate = new Date(closest.date)
        closestDate.setHours(parseInt(closest.time.split(':')[0]))
        closestDate.setMinutes(parseInt(closest.time.split(':')[1]))
        
        return currentDate > date && (closestDate < date || currentDate < closestDate) ? current : closest
      }, appointments[0])
    : null

  return (
    <div className="w-[380px] h-[500px]">
      <motion.div
        className="relative preserve-3d h-full"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Front - Clock Face */}
        <div className="backface-hidden h-full">
          <div className="flex flex-col bg-[#1C1C1E] rounded-3xl border border-zinc-800 h-full">
            {/* Clock Container */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 pb-4">
              {/* Clock */}
              <div className="relative w-[290px] h-[290px] rounded-full bg-white mb-4">
                {/* Clock marks - only lines, no numbers */}
                {[...Array(60)].map((_, i) => {
                  const rotation = (i / 60) * 360
                  const isHour = i % 5 === 0
                  return (
                    <div
                      key={i}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <div className={cn(
                        "absolute top-2 left-1/2 -translate-x-1/2",
                        isHour 
                          ? "w-0.5 h-3 bg-zinc-900" 
                          : "w-[1px] h-2 bg-zinc-300"
                      )} />
                    </div>
                  )
                })}
                
                {/* Clock hands */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-1.5 h-[100px] -ml-[0.75px] -mt-[100px] bg-zinc-900 origin-bottom rounded-full"
                  style={{ rotate: hourDegrees }}
                  transition={{ duration: 0.05 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-1 h-[120px] -ml-[0.5px] -mt-[120px] bg-zinc-900 origin-bottom rounded-full"
                  style={{ rotate: minuteDegrees }}
                  transition={{ duration: 0.05 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-0.5 h-[130px] -ml-[0.25px] -mt-[130px] bg-orange-500 origin-bottom"
                  style={{ rotate: secondDegrees }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-zinc-900" />
              </div>
            </div>

            {/* Buttons Container */}
            <div className="p-6 pt-0">
              <div className="flex flex-col gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFlipped(true)
                  }}
                  className={`${commonButtonStyles.base} ${commonButtonStyles.primary} ${commonButtonStyles.icon}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9H3zM3 10V6a2 2 0 012-2h2M7 2v4M21 10V6a2 2 0 00-2-2h-.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Book Appointment
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAppointments(!showAppointments)
                  }}
                  className={`${commonButtonStyles.base} ${commonButtonStyles.secondary} ${commonButtonStyles.icon}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Check Schedule
                </button>
                <button 
                  className={`${commonButtonStyles.base} ${commonButtonStyles.secondary} ${commonButtonStyles.icon}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Set Notifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Calendar */}
        <div className="absolute top-0 left-0 w-full backface-hidden rotate-y-180">
          <div className="bg-[#1C1C1E] rounded-3xl border border-zinc-800 h-[480px] p-6">
            <div className="relative calendar-container">
              {!showConfirmation ? (
                <div className="flex flex-col gap-6">
                  {!selectedDate ? (
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="w-[340px] h-[340px] border-none bg-transparent text-white mx-auto"
                      classNames={{
                        months: "space-y-4 w-full",
                        month: "space-y-4 w-full",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex w-full",
                        head_cell: "text-zinc-400 w-9 font-normal text-[0.8rem] text-center",
                        row: "flex w-full mt-2",
                        cell: "text-center text-sm relative p-0 [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-9",
                        day: "h-9 w-9 p-0 font-normal text-white aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-colors",
                        day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white rounded-md ring-2 ring-blue-400",
                        day_today: "bg-zinc-800 text-white rounded-md",
                        day_outside: "text-zinc-400 opacity-50",
                        day_disabled: "text-zinc-400 opacity-50",
                        day_hidden: "invisible",
                      }}
                    />
                  ) : (
                    <DayView 
                      selectedDate={selectedDate} 
                      onTimeSelect={handleTimeSelect}
                    />
                  )}
                </div>
              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <div className="text-xl font-bold mb-2">Appointment Booked!</div>
                    <div className="text-gray-400">
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
      {selectedDate && !showConfirmation && (
        <button
          onClick={() => setSelectedDate(undefined)}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Calendar
        </button>
      )}

      {/* Appointments Panel */}
      {showAppointments && appointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-[#1C1C1E] rounded-3xl border border-zinc-800 p-6 z-10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Upcoming Appointments</h3>
            <button 
              onClick={() => setShowAppointments(false)}
              className="text-gray-400 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {appointments.map((apt, index) => (
              <div 
                key={index}
                className="bg-zinc-800/50 rounded-xl p-4"
              >
                <div className="text-lg font-medium text-white mb-1">{apt.title}</div>
                <div className="text-blue-400">
                  {format(apt.date, 'MMM dd')} at {format(new Date(`2000-01-01T${apt.time}`), 'h:mm a')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
} 