import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import AddTransaction from './components/AddTransaction'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      'moneyMattersTransactions'
    )

    if (savedTransactions !== null) {
      try {
        return JSON.parse(savedTransactions)
      } catch {
        console.error('Could not load saved transactions.')
      }
    }

    return [
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
    ]
  })

  useEffect(() => {
    localStorage.setItem(
      'moneyMattersTransactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  const handleAddTransaction = transaction => {
    setTransactions(previous => [transaction, ...previous])
  }

  const handleDeleteTransaction = id => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this transaction?'
    )

    if (!shouldDelete) return

    setTransactions(previous =>
      previous.filter(transaction => transaction.id !== id)
    )
  }

  const handleEditTransaction = transaction => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleUpdateTransaction = updatedTransaction => {
    setTransactions(previous =>
      previous.map(transaction =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    )

    setEditingTransaction(null)
  }

  return (
    <BrowserRouter>
      <div className="mm-page">
        <div className="mm-app">
          <Sidebar />

          <main className="mm-main">
            <Header onAddTransaction={() => setShowForm(true)} />

            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    onDelete={handleDeleteTransaction}
                    onEdit={handleEditTransaction}
                  />
                }
              />

              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    onDelete={handleDeleteTransaction}
                    onEdit={handleEditTransaction}
                  />
                }
              />

              <Route
                path="/profile"
                element={<Profile />}
              />
            </Routes>
          </main>
        </div>

        {showForm && (
          <AddTransaction
            onAddTransaction={
              editingTransaction
                ? handleUpdateTransaction
                : handleAddTransaction
            }
            onClose={() => {
              setShowForm(false)
              setEditingTransaction(null)
            }}
            editingTransaction={editingTransaction}
          />
        )}
      </div>
    </BrowserRouter>
  )
}

export default App