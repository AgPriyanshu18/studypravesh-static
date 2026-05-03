import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Papa from 'papaparse';
import Home from './pages/Home';
import Category from './pages/Category';
import Detail from './pages/Detail';
import './index.css';

export const DataContext = createContext();

const App = () => {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    Papa.parse('/institutes.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setInstitutes(results.data.filter(row => row.name));
      }
    });
  }, []);

  return (
    <DataContext.Provider value={institutes}>
      <Router>
        <div className="wrapper">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="container top-bar-inner">
              <div className="contact-info">
                <span>Tel: +91 9983274000</span>
                <span style={{ marginLeft: '15px' }}>Reach us: info@studypravesh.com</span>
              </div>
              <div className="login-register">
                <Link to="#">Login</Link> | <Link to="#">Signup</Link> |
                <Link to="#" className="btn-list">List Your Institution</Link>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="header">
            <div className="container header-inner">
              <div className="logo">
                <Link to="/"><h2>Study Pravesh</h2></Link>
              </div>
              <nav className="main-nav">
                <ul>
                  <li><Link to="/schools.html">Schools</Link></li>
                  <li><Link to="/coaching-institutes.html">Coaching/Institutes</Link></li>
                  <li><Link to="/colleges.html">Colleges</Link></li>
                  <li><Link to="/universities.html">Universities</Link></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Secondary Nav & Search */}
          <div className="secondary-nav-bar">
            <div className="container secondary-nav-inner">
              <ul className="breadcrumbs">
                <li><Link to="/">Home</Link></li>
                <li><Link to="#">About us</Link></li>
                <li><Link to="#">Contact us</Link></li>
                <li><Link to="#">Blog</Link></li>
              </ul>
              <div className="search-box">
                <input type="text" placeholder="Search by Name..." />
                <button>Search</button>
              </div>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* SEO Preserving Category Routes */}
            <Route path="/schools.html" element={<Category type="School" />} />
            <Route path="/coaching-institutes.html" element={<Category type="Coaching" />} />
            <Route path="/colleges.html" element={<Category type="College" />} />
            <Route path="/universities.html" element={<Category type="University" />} />
            
            {/* Catch-all for Detail Pages */}
            <Route path="/:urlKey" element={<Detail />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <p>© 2026 Study Pravesh. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </DataContext.Provider>
  );
};

export default App;
