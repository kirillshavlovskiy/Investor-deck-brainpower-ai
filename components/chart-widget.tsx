'use client'

import * as React from "react"
import { TrendingUp, RotateCcw, Settings2, Save } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChartDataItem {
  browser: string
  visitors: number
  fill: string
}

const initialChartData: ChartDataItem[] = [
  { browser: "Chrome", visitors: 275, fill: "hsl(var(--chart-1))" },
  { browser: "Safari", visitors: 200, fill: "hsl(var(--chart-2))" },
  { browser: "Firefox", visitors: 287, fill: "hsl(var(--chart-3))" },
  { browser: "Edge", visitors: 173, fill: "hsl(var(--chart-4))" },
  { browser: "Other", visitors: 190, fill: "hsl(var(--chart-5))" }
]

export function ChartWidget() {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [chartData, setChartData] = React.useState<ChartDataItem[]>(initialChartData)
  const [rotation, setRotation] = React.useState(0)
  const [tempChartData, setTempChartData] = React.useState<ChartDataItem[]>(chartData)

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  const handleValueChange = (browser: string, value: string) => {
    const numValue = parseInt(value) || 0
    setTempChartData(prev => 
      prev.map(item => 
        item.browser === browser ? { ...item, visitors: numValue } : item
      )
    )
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 45) % 360)
  }

  const handleSave = () => {
    setChartData(tempChartData)
    setIsFlipped(false)
  }

  const resetData = () => {
    setTempChartData(initialChartData)
    setRotation(0)
  }

  return (
    <div className="relative w-full h-full perspective-1000">
      <div 
        className={`relative transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front side */}
        <Card className="w-full h-full bg-[hsl(var(--card))] border-[hsl(var(--border))] backface-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[hsl(var(--card-foreground))]">Website Analytics</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">Browser usage statistics</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setTempChartData(chartData)
                  setIsFlipped(true)
                }}
                className="h-8 w-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))]"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={5}
                    startAngle={90 + rotation}
                    endAngle={450 + rotation}
                  >
                    <Label
                      content={({ viewBox }) => {
                        const { cx, cy } = viewBox || { cx: 0, cy: 0 }
                        return (
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="fill-[hsl(var(--card-foreground))]"
                          >
                            <tspan x={cx} y={cy - 10} className="text-xl font-bold">
                              {totalVisitors}
                            </tspan>
                            <tspan x={cx} y={cy + 10} className="text-xs fill-[hsl(var(--muted-foreground))]">
                              Visitors
                            </tspan>
                          </text>
                        )
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {chartData.map((entry) => (
                <div key={entry.browser} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-xs truncate text-[hsl(var(--card-foreground))]">
                    {entry.browser}: {entry.visitors}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex items-center gap-2 text-emerald-500 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>5.2% increase this month</span>
            </div>
          </CardFooter>
        </Card>

        {/* Back side */}
        <Card className="w-full h-full bg-[hsl(var(--card))] border-[hsl(var(--border))] absolute top-0 left-0 rotate-y-180 backface-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[hsl(var(--card-foreground))]">Edit Chart Data</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSave}
                  className="h-8 w-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))]"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsFlipped(false)}
                  className="h-8 w-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))]"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tempChartData.map((entry) => (
                <div key={entry.browser} className="flex items-center gap-4">
                  <div 
                    className="h-4 w-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: entry.fill }}
                  />
                  <div className="flex-1">
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">{entry.browser}</label>
                    <Input
                      type="number"
                      value={entry.visitors}
                      onChange={(e) => handleValueChange(entry.browser, e.target.value)}
                      className="h-8 text-sm bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--card-foreground))]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRotate}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--card-foreground))]"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Rotate
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={resetData}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--card-foreground))]"
            >
              Reset Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 