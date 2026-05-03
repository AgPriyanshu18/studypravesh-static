import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, LogIn, Menu } from 'lucide-react';


const Header = () => {
  return (
    <header className="header glass">
      <div className="container flex-between">
        <Link to="/" className="logo">
          <BookOpen className="logo-icon" size={28} />
          <span>Study Pravesh</span>
        </Link>
        <nav className="nav-links">
          <Link to="/directory/coaching">Coaching</Link>
          <Link to="/directory/college">Colleges</Link>
          <Link to="/directory/other">Other</Link>
        </nav>
        <div className="auth-actions">
          <button className="btn btn-outline">List Institution</button>
          <button className="btn btn-primary flex-center gap-2">
            <LogIn size={18} /> Login
          </button>
        </div>
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
