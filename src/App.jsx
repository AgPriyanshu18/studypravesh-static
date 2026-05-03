import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './index.css';

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
    <div className="wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="contact-info">
            <span>Tel: +91 9983274000</span>
            <span style={{ marginLeft: '15px' }}>Reach us: info@studypravesh.com</span>
          </div>
          <div className="login-register">
            <a href="#">Login</a> | <a href="#">Signup</a> |
            <a href="#" className="btn-list">List Your Institution</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <h2>Study Pravesh</h2>
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#">Schools</a></li>
              <li><a href="#">Coaching/Institutes</a></li>
              <li><a href="#">Colleges</a></li>
              <li><a href="#">Universities</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Secondary Nav & Search */}
      <div className="secondary-nav-bar">
        <div className="container secondary-nav-inner">
          <ul className="breadcrumbs">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
          <div className="search-box">
            <input type="text" placeholder="Search by Name..." />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <img src="https://studypravesh.com/skin/frontend/rwd/default/images/homepage/amitybanner.jpg" alt="Amity Banner" />
      </div>

      {/* Main Content */}
      <div className="container main-content-area">
        
        {/* Filter Section */}
        <div className="filter-section">
          <form className="filter-form">
            <select><option>Browse by</option><option>School</option><option>College</option></select>
            <select><option>Select a Course</option></select>
            <select><option>Select a State</option><option>Rajasthan</option><option>Delhi</option></select>
            <select disabled><option>Select a City</option></select>
            <button type="button" className="btn-filter">Filter Now</button>
          </form>
        </div>

        <div className="content-layout">
          {/* Left Content: Featured */}
          <div className="left-content">
            <h3 className="section-title">Featured Schools, Colleges, Institutes and Universities</h3>
            <div className="featured-grid">
              {institutes.map(inst => (
                <div className="featured-card" key={inst.id}>
                  <img src={inst.image_url} alt={inst.name} />
                  <div className="card-detail">
                    <h4>{inst.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: News */}
          <div className="right-content">
            <h3 className="section-title">News & Announcements</h3>
            <div className="news-box">
              <ul className="news-list">
                <li>
                  <a href="#">ISRO Chairman Dr V. Narayanan inaugurates research centre at IIT Madras</a>
                  <span> (March 17, 2025)</span>
                </li>
                <li>
                  <a href="#">Canada makes major changes to visa requirements for international students</a>
                  <span> (March 17, 2025)</span>
                </li>
                <li>
                  <a href="#">National Mathematics Day 2024: Why it is celebrated on December 22</a>
                  <span> (December 21, 2024)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Study Pravesh. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
