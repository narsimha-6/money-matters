import {
  LayoutDashboard,
  ReceiptText,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './index.css'

const Sidebar = () => {
  return (
    <aside className="mm-sidebar">
      <div className="mm-brand">
        <span className="mm-brand-icon">$</span>
        <span className="mm-brand-name">
          <span>Money</span>Matters
        </span>
      </div>

      <nav className="mm-sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `mm-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `mm-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <ReceiptText size={18} />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `mm-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <UserRound size={18} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="mm-sidebar-profile">
        <div className="mm-profile-avatar">N</div>
        <div className="mm-profile-info">
          <strong>Narsimha</strong>
          <span>narsimha@gmail.com</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar