import React, { useContext } from 'react';
import { DataContext } from '../App';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const institutes = useContext(DataContext);
  const { urlKey } = useParams();
  
  // Clean the URL key (remove .html if present)
  const cleanKey = urlKey.replace('.html', '');
  
  const institute = institutes.find(inst => inst.url_key === cleanKey);

  if (!institute && institutes.length > 0) {
    return <div className="container" style={{padding: '50px', textAlign: 'center'}}><h2>Institute Not Found</h2></div>;
  }

  if (!institute) return <div className="container">Loading...</div>;

  return (
    <div className="container main-content-area">
      <div className="detail-layout" style={{display: 'flex', gap: '30px', margin: '20px 0'}}>
        
        {/* Left Col: Image */}
        <div className="product-img-box" style={{flex: '1'}}>
          <img 
            src={institute.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
            alt={institute.name} 
            style={{width: '100%', border: '1px solid #ccc', padding: '5px', background: '#fff'}}
          />
        </div>

        {/* Right Col: Details */}
        <div className="product-shop" style={{flex: '2'}}>
          <h1 style={{color: 'var(--primary)', marginTop: 0}}>{institute.name}</h1>
          
          <div style={{fontSize: '14px', color: '#555', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px'}}>
            <p style={{margin: '5px 0'}}><strong>Address:</strong> {institute.address}</p>
            <p style={{margin: '5px 0'}}><strong>City/State:</strong> {[institute.city, institute.state].filter(Boolean).join(', ')}</p>
          </div>

          <div className="short-description" style={{fontSize: '14px', lineHeight: '1.6', margin: '20px 0'}}>
            <h2>Courses Offered</h2>
            <p>{institute.courses || 'Details not available.'}</p>
          </div>

          <div className="contact-box" style={{background: '#f9f9f9', padding: '15px', border: '1px solid #ddd'}}>
            <h3 style={{marginTop: 0}}>Additional Information</h3>
            <p><strong>Fee Structure:</strong> {institute.fee_structure || 'Not provided'}</p>
            <p><strong>Results:</strong> {institute.results || 'Not provided'}</p>
          </div>
        </div>

      </div>

      {/* Description Tab */}
      <div className="product-collateral" style={{marginTop: '40px', borderTop: '2px solid var(--primary)', paddingTop: '20px'}}>
        <h2>Full Description</h2>
        <div dangerouslySetInnerHTML={{ __html: institute.description || 'No detailed description available.' }} style={{fontSize: '14px', lineHeight: '1.6'}} />
      </div>
    </div>
  );
};

export default Detail;