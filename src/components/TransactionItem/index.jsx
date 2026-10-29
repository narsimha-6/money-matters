import {ArrowDownLeft, ArrowUpRight} from 'lucide-react'
import './index.css'

const TransactionItem = ({transaction}) => {
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

      <div className="transaction-category">{transaction.category}</div>

      <p className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default TransactionItem