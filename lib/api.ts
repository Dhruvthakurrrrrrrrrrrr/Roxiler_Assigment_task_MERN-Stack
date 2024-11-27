export async function fetchTransactionData() {
    const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    return response.json();
  }
  
  