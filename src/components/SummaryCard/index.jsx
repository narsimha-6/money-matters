import {ArrowDownLeft, ArrowUpRight} from 'lucide-react'
import './index.css'

const SummaryCard = ({title, amount, type}) => {
  const Icon = type === 'credit' ? ArrowDownLeft : ArrowUpRight

  return (
    <div className={`summary-card ${type}`}>
      <div className="summary-card-details">
        <p className="summary-card-title">{title}</p>
        <h2 className="summary-card-amount">{amount}</h2>
      </div>

      <div className="summary-card-icon">
        <Icon size={36} strokeWidth={1.8} />
      </div>
    </div>
  )
}

export default SummaryCard