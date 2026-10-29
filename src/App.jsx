
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <div className="mm-page">
      <div className="mm-page-label">Dashboard</div>

      <div className="mm-app">
        <Sidebar />

        <main className="mm-main">
          <Header />
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
