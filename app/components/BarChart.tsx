import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: number
  title: string
  description: string
  price: number
  category: string
  sold: boolean
  image: string
}

interface TransactionTableProps {
  month: string
  searchTerm: string
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function TransactionTable({ month, searchTerm, currentPage, setCurrentPage }: TransactionTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTransactions()
  }, [month, searchTerm, currentPage])

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?month=${month}&search=${searchTerm}&page=${currentPage}`)
      const data = await response.json()
      setTransactions(data.transactions)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <img src={transaction.image} alt={transaction.title} className="w-10 h-10 object-cover" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>Page {currentPage} of {totalPages}</div>
        <div>
          <Button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

