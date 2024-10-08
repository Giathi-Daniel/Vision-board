import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaBell, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import AuthContext from './AuthContext';

const Header = ({ title, onHomeClick, onNotificationClick }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleHomeClick = () => {
    if (onHomeClick) onHomeClick();
    navigate('/');
    closeMenu();
  };

  const handleLoginClick = () => {
    navigate('/login');
    closeMenu();
  };

  const handleRegisterClick = () => {
    navigate('/register');
    closeMenu();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    closeMenu();
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        {onHomeClick && (
          <button onClick={handleHomeClick} className="text-blue-600 hover:text-blue-800">
            <FaHome size={24} />
          </button>
        )}
        <button onClick={onNotificationClick} className="text-blue-600 hover:text-blue-800">
          <FaBell size={24} />
        </button>
        <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
          <FaChartBar size={24} />
        </Link>
        {!user ? (
          <>
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md"
            >
              Sign In
            </button>
            <button
              onClick={handleRegisterClick}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleProfileClick}
              className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md"
            >
              Profile
            </button>
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <button className="lg:hidden text-gray-600 hover:text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav ref={menuRef} className={`absolute top-[77px] right-4 bg-white shadow-md w-48 ${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="flex flex-col items-center p-4 space-y-2">
          <button onClick={handleHomeClick} className="flex items-center w-full text-blue-600 hover:text-blue-800">
            <FaHome size={24} className="mr-2" />
            Home
          </button>
          <button onClick={onNotificationClick} className="flex items-center w-full text-blue-600 hover:text-blue-800">
            <FaBell size={24} className="mr-2" />
            Notifications
          </button>
          <Link to="/dashboard" className="flex items-center w-full text-blue-600 hover:text-blue-800" onClick={closeMenu}>
            <FaChartBar size={24} className="mr-2" />
            Dashboard
          </Link>
          {!user ? (
            <>
              <button
                onClick={handleLoginClick}
                className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={handleRegisterClick}
                className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleProfileClick}
                className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md"
              >
                Profile
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
