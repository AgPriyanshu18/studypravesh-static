import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './index.css';

const App = () => {
  const [institutes, setInstitutes] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Read the CSV data
    Papa.parse('/institutes.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setInstitutes(results.data.filter(row => row.name));
      }
    });
  }, []);

  const filteredInstitutes = filter === 'All' 
    ? institutes 
    : institutes.filter(inst => inst.category === filter);

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">Study Pravesh</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero">
          <h1>Find Your Dream Institution</h1>
          <p>Explore top schools, colleges, and coaching centers across India.</p>
        </div>

        <div className="filters">
          {['All', 'School', 'College', 'University', 'Coaching'].map(cat => (
            <button 
              key={cat} 
              className={filter === cat ? 'active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredInstitutes.map(inst => (
            <div className="card" key={inst.id}>
              <img src={inst.image_url} alt={inst.name} />
              <div className="card-body">
                <span className={`badge ${inst.category?.toLowerCase()}`}>{inst.category}</span>
                <h3>{inst.name}</h3>
                <p className="location">📍 {inst.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>© 2026 Study Pravesh. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
