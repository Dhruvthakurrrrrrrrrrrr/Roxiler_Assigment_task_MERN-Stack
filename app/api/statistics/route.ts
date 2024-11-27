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

    const totalSale = filteredData.reduce((sum: number, item: any) => sum + item.price, 0);
    const totalSoldItems = filteredData.filter((item: any) => item.sold).length;
    const totalNotSoldItems = filteredData.length - totalSoldItems;

    return NextResponse.json({
      totalSale,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}


