import { useState } from 'react'
import SummaryCard from '../../components/SummaryCard'
import TransactionItem from '../../components/TransactionItem'
import OverviewChart from '../../components/OverviewChart'
import './index.css'

const parseTransactionDate = (dateString) => {
  if (!dateString) return null

  const parsedDate = new Date(dateString)

  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate
  }

  const parts = dateString.split(' ')

  if (parts.length !== 3) return null

  const [day, month, year] = parts
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]

  const monthIndex = monthNames.findIndex(
    (name) => name.toLowerCase() === month.toLowerCase()
  )

  if (monthIndex === -1) return null

  return new Date(Number(year), monthIndex, Number(day))
}

const Dashboard = ({ transactions = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const totalCredit = transactions
    .filter((transaction) => transaction.type === 'credit')
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0)

  const totalDebit = transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0)

  const totalBalance = totalCredit - totalDebit

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = parseTransactionDate(transaction.date)

    return (
      transactionDate &&
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    )
  })

  const monthlyCredit = monthlyTransactions
    .filter((transaction) => transaction.type === 'credit')
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0)

  const monthlyDebit = monthlyTransactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0)

  const monthlySavings = monthlyCredit - monthlyDebit

  const savingsPercentage =
    monthlyCredit > 0
      ? ((monthlySavings / monthlyCredit) * 100).toFixed(1)
      : 0

  const categoryExpenses = transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((categories, transaction) => {
      const category = transaction.category || 'Other'

      categories[category] =
        (categories[category] || 0) + Number(transaction.amount || 0)

      return categories
    }, {})

  const totalCategoryExpenses = Object.values(categoryExpenses).reduce(
    (total, amount) => total + amount,
    0
  )

  const highestExpenseCategory = Object.entries(categoryExpenses).reduce(
    (highest, current) =>
      current[1] > highest[1] ? current : highest,
    ['', 0]
  )

 const filteredTransactions = transactions.filter((transaction) => {
  const matchesSearch =
    (transaction.name || transaction.title || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (transaction.category || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

  const matchesType =
    filterType === 'all' || transaction.type === filterType

  return matchesSearch && matchesType
})

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions available to export.')
      return
    }

    const headers = ['Title', 'Category', 'Type', 'Amount', 'Date']

    const rows = transactions.map((transaction) => [
      transaction.title,
      transaction.category,
      transaction.type,
      transaction.amount,
      transaction.date,
    ])

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'money-matters-transactions.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <SummaryCard
          title="Total Credit"
          amount={totalCredit}
          type="credit"
        />

        <SummaryCard
          title="Total Debit"
          amount={totalDebit}
          type="debit"
        />

        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
          type="balance"
        />
      </div>

      <section className="monthly-summary">
        <h2>Monthly Summary</h2>

        <p>
          Monthly Credit:
          <strong> ₹{monthlyCredit.toLocaleString('en-IN')}</strong>
        </p>

        <p>
          Monthly Debit:
          <strong> ₹{monthlyDebit.toLocaleString('en-IN')}</strong>
        </p>

        <p>
          Monthly Savings:
          <strong> ₹{monthlySavings.toLocaleString('en-IN')}</strong>
        </p>

        <p>
          Savings Percentage:
          <strong> {savingsPercentage}%</strong>
        </p>

        <div className="savings-progress">
          <div
            className="savings-progress-fill"
            style={{
              width: `${Math.max(
                0,
                Math.min(100, Number(savingsPercentage))
              )}%`,
            }}
          ></div>
        </div>
      </section>

      <section className="category-summary">
        <h2>Expense by Category</h2>

        {highestExpenseCategory[1] > 0 && (
          <p className="highest-category">
            Highest spending:{' '}
            <strong>{highestExpenseCategory[0]}</strong>
            {' '}— ₹
            {highestExpenseCategory[1].toLocaleString('en-IN')}
          </p>
        )}

        {Object.entries(categoryExpenses).length > 0 ? (
          Object.entries(categoryExpenses).map(([category, amount]) => (
            <div key={category} className="category-item">
              <div className="category-details">
                <span>{category}</span>
                <strong>₹{amount.toLocaleString('en-IN')}</strong>
              </div>

              <div className="category-progress">
                <div
                  className="category-progress-fill"
                  style={{
                    width: `${
                      totalCategoryExpenses > 0
                        ? (amount / totalCategoryExpenses) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p>No expenses available.</p>
        )}
      </section>

      <section className="recent-transactions">
        <div className="transactions-header">
          <h2>Recent Transactions</h2>

          <button onClick={handleExport}>
            Export CSV
          </button>
        </div>

        <div className="transaction-controls">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="transaction-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </section>

      <OverviewChart transactions={transactions} />
    </div>
  )
}

export default Dashboard