import React, { useContext } from 'react';
import { DataContext } from '../App';
import { Link } from 'react-router-dom';

const Home = () => {
  const institutes = useContext(DataContext);
  const featured = institutes.slice(0, 8); // Just show first 8 as featured

  return (
    <>
      <div className="hero-banner">
        <img src="https://studypravesh.com/skin/frontend/rwd/default/images/homepage/amitybanner.jpg" alt="Amity Banner" />
      </div>

      <div className="container main-content-area">
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
          <div className="left-content">
            <h3 className="section-title">Featured Schools, Colleges, Institutes and Universities</h3>
            <div className="featured-grid">
              {featured.map(inst => (
                <div className="featured-card" key={inst.id}>
                  <Link to={`/${inst.url_key}.html`}>
                    <img src={inst.image_url} alt={inst.name} />
                  </Link>
                  <div className="card-detail">
                    <Link to={`/${inst.url_key}.html`} style={{textDecoration: 'none'}}>
                      <h4>{inst.name}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
