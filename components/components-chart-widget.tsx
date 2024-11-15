'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const initialData = [
  { month: 'Jan', revenue: 1000, expenses: 700, roi: 42.86 },
  { month: 'Feb', revenue: 1500, expenses: 1000, roi: 50.00 },
  { month: 'Mar', revenue: 2000, expenses: 1200, roi: 66.67 },
  { month: 'Apr', revenue: 2500, expenses: 1500, roi: 66.67 },
  { month: 'May', revenue: 3000, expenses: 1800, roi: 66.67 },
  { month: 'Jun', revenue: 3500, expenses: 2000, roi: 75.00 },
]

export function ChartWidget() {
  const [data, setData] = useState(initialData)
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const updateData = () => {
    const newData = data.map(item => {
      const newRevenue = Math.floor(item.revenue * (0.8 + Math.random() * 0.4))
      const newExpenses = Math.floor(item.expenses * (0.8 + Math.random() * 0.4))
      const newRoi = ((newRevenue - newExpenses) / newExpenses * 100).toFixed(2)
      return {
        ...item,
        revenue: newRevenue,
        expenses: newExpenses,
        roi: parseFloat(newRoi)
      }
    })
    setData(newData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Performance Visualization</CardTitle>
        <CardDescription>Easily analyze your financial data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="expenses">Expenses</SelectItem>
              <SelectItem value="roi">ROI</SelectItem>
              <SelectItem value="all">All Metrics</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={updateData}>Update Data</Button>
        </div>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            expenses: {
              label: "Expenses",
              color: "hsl(var(--chart-2))",
            },
            roi: {
              label: "ROI (%)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {(selectedMetric === 'revenue' || selectedMetric === 'all') && (
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Revenue" />
              )}
              {(selectedMetric === 'expenses' || selectedMetric === 'all') && (
                <Line yAxisId="left" type="monotone" dataKey="expenses" stroke="var(--color-expenses)" name="Expenses" />
              )}
              {(selectedMetric === 'roi' || selectedMetric === 'all') && (
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="var(--color-roi)" name="ROI (%)" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}