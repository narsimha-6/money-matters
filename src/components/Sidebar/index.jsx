import { LayoutDashboard,ReceiptText,UserRound } from "lucide-react"
import './index.css'

const Sidebar = () => {
  return (
   <aside className="mm-sidebar">
    <div className="mm-brand">
        <span className="mm-brand-icon">$</span>
        <span className="mm-brand-name"><span>Money</span>Matters</span>
    </div>

<nav className="mm-sidebar-nav">
    <a href="/" className="mm-nav-link active">
    <LayoutDashboard size={14}/>
    <span>Dashboard</span>
    </a>
</nav>

<a href="/transactions" className="mm-nav-link">
<ReceiptText size={14}/>
<span>Transactions</span>
</a>

<a href="/profile" className="mm-nav-link">
<UserRound size={14}/>
<span>Profile</span>
</a>

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
