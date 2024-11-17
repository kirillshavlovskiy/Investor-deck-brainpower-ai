'use client'

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { browser: "Chrome", visitors: 275, fill: "#4285F4" },
  { browser: "Safari", visitors: 200, fill: "#34A853" },
  { browser: "Firefox", visitors: 287, fill: "#EA4335" },
  { browser: "Edge", visitors: 173, fill: "#FBBC05" },
  { browser: "Other", visitors: 190, fill: "#7C7C7C" }
]

interface ChartWidgetProps {
  size?: 'small' | 'medium' | 'large'
}

export function ChartWidget({ size = 'medium' }: ChartWidgetProps) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <div className="w-[380px] h-[500px]">
      <Card className="bg-[#1C1C1E] border-zinc-800 text-white h-full">
        <CardHeader className="items-start pb-0 pt-6">
          <CardTitle className="text-2xl">Website Analytics</CardTitle>
          <CardDescription className="text-zinc-500">Browser usage statistics</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto h-[290px] relative flex items-center justify-center">
            <PieChart width={290} height={290}>
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                strokeWidth={0}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-white"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-2xl font-bold"
                          >
                            {totalVisitors}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="text-sm text-zinc-400"
                          >
                            visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </div>
          
          {/* Legend - reduced gap */}
          <div className="grid grid-cols-2 gap-2 mt-1 px-4">
            {chartData.map((entry) => (
              <div key={entry.browser} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-sm text-zinc-300">{entry.browser}: {entry.visitors}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm pt-2 pb-6">
          <div className="flex items-center gap-2 font-medium text-green-400">
            <TrendingUp className="h-4 w-4" />
            5.2% increase this month
          </div>
          <div className="text-zinc-400 text-xs">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 