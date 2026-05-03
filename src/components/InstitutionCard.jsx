import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';


const InstitutionCard = ({ data }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={data.image} alt={data.name} className="card-image" loading="lazy" />
        <span className="card-badge">{data.category}</span>
      </div>
      <div className="card-content">
        <div className="flex-between align-start mb-2">
          <h3 className="card-title">{data.name}</h3>
          <div className="rating-badge flex-center">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span>{data.rating}</span>
          </div>
        </div>
        
        <div className="card-location flex-center justify-start text-muted mb-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <MapPin size={16} className="mr-1" style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.location}</span>
        </div>
        
        <p className="card-desc text-muted mb-4">{data.description}</p>
        
        <div className="card-footer flex-between">
          <div className="fees-info">
            <span className="fees-label">Avg. Fees</span>
            <span className="fees-amount">₹{data.fees.toLocaleString('en-IN')}</span>
          </div>
          <button className="btn btn-icon btn-primary">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;
