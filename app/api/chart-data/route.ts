import { NextResponse } from 'next/server';
import { fetchTransactionData } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');

  try {
    const data = await fetchTransactionData();
    
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.dateOfSale);
      const itemMonth = itemDate.toLocaleString('default', { month: 'long' });
      return itemMonth.toLowerCase() === month?.toLowerCase();
    });

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }
    ];

    const chartData = priceRanges.map(range => {
      const count = filteredData.filter((item: any) => 
        item.price >= range.min && item.price <= range.max
      ).length;
      return {
        label: `${range.min}-${range.max === Infinity ? 'above' : range.max}`,
        count
      };
    });

    return NextResponse.json({
      labels: chartData.map(item => item.label),
      values: chartData.map(item => item.count)
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}

