import { NextResponse } from 'next/server';
import { fetchTransactionData } from '@/lib/api';

export async function GET() {
  try {
    const data = await fetchTransactionData();
    // In a real application, you would save this data to your database here
    return NextResponse.json({ message: 'Database initialized successfully', count: data.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}

