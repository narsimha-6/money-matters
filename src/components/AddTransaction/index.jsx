
import {useState} from 'react'
import './index.css'

const AddTransaction = ({
  onAddTransaction,
  onClose,
  editingTransaction,
}) => {
const [name, setName] = useState(editingTransaction?.name || '')
const [amount, setAmount] = useState(
  editingTransaction ? String(editingTransaction.amount) : '',
)
const [type, setType] = useState(editingTransaction?.type || 'debit')
const [category, setCategory] = useState(
  editingTransaction?.category || 'Food',
)
const [date, setDate] = useState(() => {
  if (!editingTransaction) return ''

  const [day, month, year] = editingTransaction.date.split(' ')
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04',
    May: '05', Jun: '06', Jul: '07', Aug: '08',
    Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  }

  return `${year}-${months[month]}-${day.replace(',', '').padStart(2, '0')}`
})
  const handleSubmit = event => {
    event.preventDefault()

    if (
      name.trim() === '' ||
      amount === '' ||
      Number(amount) <= 0 ||
      date === ''
    ) {
      alert('Please enter valid transaction details.')
      return
    }

    const transactionData = {
      id: editingTransaction?.id || Date.now(),
      name: name.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }

    onAddTransaction(transactionData)
    onClose()
  }

  return (
    <div className="transaction-form-overlay">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>

        <label htmlFor="transaction-name">Transaction Name</label>
        <input
          id="transaction-name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="e.g. Grocery Shopping"
          required
        />

        <label htmlFor="transaction-amount">Amount (₹)</label>
        <input
          id="transaction-amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={event => setAmount(event.target.value)}
          placeholder="Enter amount"
          required
        />

        <label htmlFor="transaction-type">Transaction Type</label>
        <select
          id="transaction-type"
          value={type}
          onChange={event => setType(event.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <label htmlFor="transaction-category">Category</label>
        <select
          id="transaction-category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Income">Income</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="transaction-date">Date</label>
        <input
          id="transaction-date"
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          required
        />

        <div className="transaction-form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">{editingTransaction ? 'Update Transaction' : 'Save Transaction'}</button>
        </div>
      </form>
    </div>
  )
}

export default AddTransaction
