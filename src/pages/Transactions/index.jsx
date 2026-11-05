
import { useState } from 'react'
import TransactionItem from '../../components/TransactionItem'
import './index.css'

const Transactions = ({ transactions = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredTransactions = transactions.filter(transaction => {
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

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h2>All Transactions</h2>
          <p>View and manage all your transactions.</p>
        </div>

        <span className="transactions-count">
          {filteredTransactions.length} Transactions
        </span>
      </div>

      <div className="transactions-toolbar">
        <div className="transactions-search">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="transactions-filter">
          <button
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All
          </button>

          <button
            className={filterType === 'credit' ? 'active' : ''}
            onClick={() => setFilterType('credit')}
          >
            Credit
          </button>

          <button
            className={filterType === 'debit' ? 'active' : ''}
            onClick={() => setFilterType('debit')}
          >
            Debit
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="transactions-empty">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions
