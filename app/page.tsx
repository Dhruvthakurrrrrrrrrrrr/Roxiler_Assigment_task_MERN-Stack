'use client'

import { useState, useEffect } from 'react'
import TransactionTable from './components/TransactionTable'
import Statistics from './components/Statistics'
import BarChart from './components/BarChart'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState('March')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedMonth, searchTerm])

  const initializeDatabase = async () => {
    try {
      const response = await fetch('/api/initialize')
      const data = await response.json()
      if (data.message) {
        setIsInitialized(true)
        alert(data.message)
      }
    } catch (error) {
      console.error('Failed to initialize database:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
      {!isInitialized && (
        <Button onClick={initializeDatabase} className="mb-4">Initialize Database</Button>
      )}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TransactionTable 
        month={selectedMonth} 
        searchTerm={searchTerm} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Statistics month={selectedMonth} />
        <BarChart month={selectedMonth} />
      </div>
    </div>
  )
}

