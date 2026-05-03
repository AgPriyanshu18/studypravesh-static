import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="heading-md">Study Pravesh</h2>
            <p className="text-muted mt-2">
              India's premier educational listing web portal for admissions. Discover top schools, colleges, and coaching institutes all in one place.
            </p>
          </div>
          <div className="footer-links">
            <h3 className="heading-sm mb-3">Quick Links</h3>
            <ul>
              <li><Link to="/directory/coaching">Coaching</Link></li>
              <li><Link to="/directory/college">Colleges</Link></li>
              <li><Link to="/directory/other">Other</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3 className="heading-sm mb-3">Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom flex-between">
          <p>&copy; {new Date().getFullYear()} Study Pravesh Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
