import { NextResponse } from 'next/server';
import { fetchTransactionData } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = 10;

  try {
    const data = await fetchTransactionData();
    
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.dateOfSale);
      const itemMonth = itemDate.toLocaleString('default', { month: 'long' });
      const matchesMonth = itemMonth.toLowerCase() === month?.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                            item.description.toLowerCase().includes(search.toLowerCase()) ||
                            item.price.toString().includes(search);
      return matchesMonth && matchesSearch;
    });

    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);

    return NextResponse.json({
      transactions: paginatedData,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

