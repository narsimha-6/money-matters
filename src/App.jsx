
import {useState} from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import AddTransaction from './components/AddTransaction'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: 'Monthly Salary',
      date: '28 Oct 2026',
      category: 'Income',
      amount: 45000,
      type: 'credit',
    },
    {
      id: 2,
      name: 'Grocery Shopping',
      date: '27 Oct 2026',
      category: 'Food',
      amount: 2500,
      type: 'debit',
    },
    {
      id: 3,
      name: 'Freelance Project',
      date: '26 Oct 2026',
      category: 'Income',
      amount: 8000,
      type: 'credit',
    },
    {
      id: 4,
      name: 'Electricity Bill',
      date: '25 Oct 2026',
      category: 'Bills',
      amount: 1200,
      type: 'debit',
    },
  ])

  const handleAddTransaction = transaction => {
    setTransactions(previousTransactions => [
      transaction,
      ...previousTransactions,
    ])
  }

  return (
    <div className="mm-page">
      <div className="mm-page-label">Dashboard</div>

      <div className="mm-app">
        <Sidebar />

        <main className="mm-main">
          <Header onAddTransaction={() => setShowForm(true)} />

          <Dashboard transactions={transactions} />
        </main>
      </div>

      {showForm && (
        <AddTransaction
          onAddTransaction={handleAddTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App
