import {Plus} from 'lucide-react'
import './index.css'
const Header = () => {
  return (
    <header className='mm-header'>
        <h1 className='mm-header-title'>Accounts</h1>

        <button type='button' className='mm-add-button'>
            <Plus size={12}/>
            <span>Add Transaction</span>
        </button>
    </header>
  )
}

export default Header
