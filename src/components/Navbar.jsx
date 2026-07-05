import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CheckSquare, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <CheckSquare size={28} />
        <span>TaskMaster</span>
      </Link>
      
      <div className="navbar__links">
        {currentUser ? (
          <>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/todos" className={({ isActive }) => (isActive ? 'active' : '')}>
              Tasks
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              Users
            </NavLink>
            
            <div className="navbar__dropdown">
              <button 
                className="dropdown-toggle" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              >
                <span>{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={16} />
              </button>
              
              {dropdownOpen && (
                <div className="dropdown-menu animate-slide-up">
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/change-password" className="dropdown-item">
                    <Settings size={16} /> Password
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
