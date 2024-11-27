import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatisticsProps {
  month: string
}

interface Stats {
  totalSale: number
  totalSoldItems: number
  totalNotSoldItems: number
}

export default function Statistics({ month }: StatisticsProps) {
  const [stats, setStats] = useState<Stats>({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  })

  useEffect(() => {
    fetchStatistics()
  }, [month])

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/statistics?month=${month}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics - {month}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Total Sale</p>
            <p className="text-2xl font-bold">${stats.totalSale.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Sold Items</p>
            <p className="text-2xl font-bold">{stats.totalSoldItems}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Not Sold Items</p>
            <p className="text-2xl font-bold">{stats.totalNotSoldItems}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

