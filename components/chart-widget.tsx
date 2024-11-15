'use client'

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartWidgetProps {
  theme?: 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
}

const defaultData = [
  { month: 'Jan', revenue: 1000 },
  { month: 'Feb', revenue: 1500 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 1750 },
  { month: 'May', revenue: 2500 },
  { month: 'Jun', revenue: 3000 }
]

export function ChartWidget({
  theme = 'dark',
  size = 'medium'
}: ChartWidgetProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [chartData, setChartData] = useState(defaultData)

  const data = {
    labels: chartData.map(item => item.month),
    datasets: [{
      label: 'Revenue',
      data: chartData.map(item => item.revenue),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const handleValueChange = (index: number, newValue: string) => {
    const newData = [...chartData]
    newData[index] = {
      ...newData[index],
      revenue: Number(newValue) || 0
    }
    setChartData(newData)
  }

  const chartSize = {
    small: 'w-[32rem] h-96',
    medium: 'w-[40rem] h-[32rem]',
    large: 'w-[48rem] h-[36rem]'
  }[size]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
        color: theme === 'dark' ? '#fff' : '#000',
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        padding: 20
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: theme === 'dark' ? '#fff' : '#000',
        bodyColor: theme === 'dark' ? '#fff' : '#000',
        padding: 12,
        borderColor: '#3b82f6',
        borderWidth: 1,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  }

  return (
    <div className="perspective-1000">
      <motion.div
        className={cn(
          "relative w-full h-full transition-all duration-500",
          "preserve-3d cursor-pointer"
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Chart Display */}
        <div className={cn(
          "absolute w-full h-full backface-hidden",
          `${chartSize} p-6 bg-zinc-900 rounded-3xl`
        )}>
          <Line data={data} options={options} />
        </div>

        {/* Back - Data Editor */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            `${chartSize} p-6`,
            theme === 'dark' ? 'bg-zinc-800' : 'bg-white',
            "rounded-3xl"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 h-full overflow-auto">
            <h3 className={theme === 'dark' ? 'text-white' : 'text-zinc-800'}>
              Edit Chart Data
            </h3>
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className={theme === 'dark' ? 'text-white' : 'text-zinc-800'}>
                  {item.month}
                </span>
                <input
                  type="number"
                  value={item.revenue}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className="rounded px-3 py-2 border w-32"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 