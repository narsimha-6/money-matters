import {
  ArrowDownLeft,
  ArrowUpRight,
  Trash2,
  Pencil,
} from 'lucide-react'
import './index.css'

const TransactionItem = ({transaction, onDelete, onEdit}) => {
  const isCredit = transaction.type === 'credit'
  const Icon = isCredit ? ArrowDownLeft : ArrowUpRight

  return (
    <div className="transaction-item">
      <div className={`transaction-icon ${isCredit ? 'credit' : 'debit'}`}>
        <Icon size={18} />
      </div>

      <div className="transaction-details">
        <h3 className="transaction-name">{transaction.name}</h3>
        <p className="transaction-date">{transaction.date}</p>
      </div>

      <div className="transaction-category">
        {transaction.category}
      </div>

      <p className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? '+' : '-'}₹
        {transaction.amount.toLocaleString('en-IN')}
      </p>

      <button
        type="button"
        className="edit-transaction-button"
        onClick={() => onEdit(transaction)}
        aria-label={`Edit ${transaction.name}`}
        title="Edit transaction"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        className="delete-transaction-button"
        onClick={() => onDelete(transaction.id)}
        aria-label={`Delete ${transaction.name}`}
        title="Delete transaction"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default TransactionItem