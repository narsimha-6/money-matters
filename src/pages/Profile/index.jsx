
import { useNavigate } from 'react-router-dom'
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  ShieldCheck,
  Wallet,
  Pencil,
} from 'lucide-react'
import './index.css'

const Profile = () => {
  const navigate = useNavigate()

  const user = {
    name: 'Narsimha',
    email: 'narsimha@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, Telangana',
    occupation: 'Software Developer',
    memberSince: 'November 2026',
    accountType: 'Personal Account',
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h2>My Profile</h2>
          <p>Manage your personal information and account details.</p>
        </div>

        <button className="profile-edit-btn">
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      <section className="profile-card">
        <div className="profile-cover"></div>

        <div className="profile-main-info">
          <div className="profile-large-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-user-name">
            <h2>{user.name}</h2>
            <p>{user.occupation}</p>
            <span className="profile-status">
              <span></span> Active Account
            </span>
          </div>
        </div>
      </section>

      <div className="profile-content">
        <section className="profile-details-card">
          <h3>
            <UserRound size={19} />
            Personal Information
          </h3>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <Mail />
              <div>
                <span>Email Address</span>
                <strong>{user.email}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <Phone />
              <div>
                <span>Phone Number</span>
                <strong>{user.phone}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <MapPin />
              <div>
                <span>Location</span>
                <strong>{user.location}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <BriefcaseBusiness />
              <div>
                <span>Occupation</span>
                <strong>{user.occupation}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-details-card">
          <h3>
            <ShieldCheck size={19} />
            Account Information
          </h3>

          <div className="profile-account-list">
            <div>
              <span>Account Type</span>
              <strong>{user.accountType}</strong>
            </div>

            <div>
              <span>Member Since</span>
              <strong>{user.memberSince}</strong>
            </div>

            <div>
              <span>Account Status</span>
              <strong className="account-active">Active</strong>
            </div>
          </div>
        </section>

        <section className="profile-details-card profile-security-card">
          <div className="profile-security-icon">
            <Wallet size={24} />
          </div>

          <div>
            <h3>Money Matters</h3>
            <p>Your personal finance management dashboard.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
