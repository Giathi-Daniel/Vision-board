import React, { useContext } from 'react'
import {useNavigate} from "react-router-dom"
import {FaHome} from "react-icons/fa"
import AuthContext from './AuthContext'

const Header = ({title, onHomeClick}) => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleHomeClick = () => {
    if(onHomeClick) onHomeClick()
      navigate('/')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleLogoutClick = () => {
    logout()
    navigate('/')
  }
  
  return (
    <header className="flex items-center justify-between p-4 mb-6 bg-white rounded-md shadow-md">
      <div className='flex items-center'>
        <h1 className="text-3xl font-bold text-center text-gray-800">{title}</h1>
        {onHomeClick && (
          <button onClick={handleHomeClick} className="ml-4 text-blue-600 hover:text-blue-800">
            <FaHome size={24} />
          </button>
        )} 
      </div>
      <div className='flex items-center'>
        {!user ? (
          <>
            <button
              onClick={handleLoginClick}
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Sign In
            </button>
            <button
              onClick={handleRegisterClick}
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleProfileClick}
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Profile
            </button>
            <button
              onClick={handleLogoutClick}
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header