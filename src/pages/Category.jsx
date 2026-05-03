import React, { useContext } from 'react';
import { DataContext } from '../App';
import { Link } from 'react-router-dom';

const Category = ({ type }) => {
  const institutes = useContext(DataContext);
  const filtered = institutes.filter(inst => inst.category === type);

  return (
    <div className="container main-content-area">
      <div className="content-layout">
        
        {/* Left Sidebar Filters */}
        <div className="sidebar" style={{flex: '1', minWidth: '250px'}}>
          <div className="sidebar-block">
            <h3 className="section-title">Filter By</h3>
            <div style={{padding: '15px', border: '1px solid var(--border)', background: '#fff'}}>
              <h4 style={{marginTop: 0, fontSize: '14px'}}>City</h4>
              <ul style={{listStyle: 'none', padding: 0, fontSize: '13px'}}>
                <li><input type="checkbox"/> Jaipur (42)</li>
                <li><input type="checkbox"/> Delhi (15)</li>
                <li><input type="checkbox"/> Mumbai (8)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-col" style={{flex: '3'}}>
          <h1 style={{borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: 0}}>
            {type} in India
          </h1>
          
          <div className="toolbar" style={{background: '#f5f5f5', padding: '10px', marginBottom: '20px', fontSize: '13px'}}>
            <span>{filtered.length} Item(s)</span>
          </div>

          <div className="featured-grid" style={{gap: '20px'}}>
            {filtered.map(inst => (
              <div className="featured-card" key={inst.id} style={{width: '230px'}}>
                <Link to={`/${inst.url_key}.html`}>
                  <img src={inst.image_url} alt={inst.name} />
                </Link>
                <div className="card-detail">
                  <Link to={`/${inst.url_key}.html`} style={{textDecoration: 'none'}}>
                    <h4 style={{fontWeight: 'bold', color: '#333'}}>{inst.name}</h4>
                  </Link>
                  <p style={{fontSize: '12px', color: '#666', margin: '5px 0'}}>{inst.location}</p>
                  <Link to={`/${inst.url_key}.html`} className="btn-filter" style={{display: 'inline-block', padding: '5px 10px', fontSize: '12px', textDecoration: 'none', marginTop: '10px'}}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Category;
