
import {Plus} from 'lucide-react'
import './index.css'

const Header = ({onAddTransaction}) => {
  return (
    <header className="mm-header">
      <h1 className="mm-header-title">Accounts</h1>

      <button
        type="button"
        className="add-transaction-button"
        onClick={onAddTransaction}
      >
        <Plus size={16} />
        Add Transaction
      </button>
    </header>
  )
}

export default Header
