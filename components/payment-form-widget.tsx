'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreditCard } from 'lucide-react'
import { commonButtonStyles } from '@/components/common/button-styles'

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString())

export function PaymentFormWidget() {
  return (
    <div className="w-[380px] h-[500px]">
      <Card className="bg-[#1C1C1E] border-zinc-800 text-white h-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Payment Method</CardTitle>
          <CardDescription className="text-gray-400">Add a new payment method to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 peer-data-[state=checked]:border-blue-500"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 peer-data-[state=checked]:border-blue-500"
              >
                <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" fill="currentColor" />
                </svg>
                PayPal
              </Label>
            </div>
            <div>
              <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 peer-data-[state=checked]:border-blue-500"
              >
                <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor" />
                </svg>
                Apple
              </Label>
            </div>
          </RadioGroup>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" className="bg-zinc-800 border-zinc-700" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="number">Card number</Label>
            <Input id="number" className="bg-zinc-800 border-zinc-700" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select>
                <SelectTrigger id="month" className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year" className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" className="bg-zinc-800 border-zinc-700" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-[36px] text-[14px] font-medium bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Payment Method
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 