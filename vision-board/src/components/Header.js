import React from 'react'
import {useNavigate} from "react-router-dom"
import {FaHome} from "react-icons/fa"

const Header = ({title, onHomeClick}) => {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    if(onHomeClick) onHomeClick()
      navigate('/')
  }
  return (
    <header className="bg-white shadow-md flex justify-center items-center p-4 rounded-md mb-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mr-20">{title}</h1>
      {onHomeClick && (
        <button onClick={handleHomeClick} className="text-blue-600 hover:text-blue-800">
          <FaHome size={24} />
        </button>
      )} 
    </header>
  )
}

export default Header