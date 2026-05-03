import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, BookOpen, GraduationCap, Building, Star } from 'lucide-react';
import { locations } from '../data/mockData';
import InstitutionCard from '../components/InstitutionCard';
import { fetchInstitutions } from '../utils/api';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All India');
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInstitutions();
        setFeatured(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured institutions', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/directory/${selectedType === 'all' ? 'college' : selectedType}?search=${searchTerm}&loc=${selectedLocation}`);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-text text-center">
            <h1 className="heading-xl mb-4 text-white">Find Your Ideal Institution</h1>
            <p className="hero-subtitle text-white mb-8">
              Discover top-rated schools, colleges, universities, and coaching institutes near you.
            </p>
          </div>

          <div className="search-widget glass">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-group">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="search-divider"></div>
              
              <div className="search-group">
                <MapPin className="search-icon" size={20} />
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="search-select"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="search-divider"></div>

              <div className="search-group">
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="search-select"
                >
                  <option value="all">All Categories</option>
                  <option value="coaching">Coaching</option>
                  <option value="college">Colleges</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary search-btn">Search Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Links */}
      <section className="categories-section container mt-12 mb-12">
        <h2 className="heading-lg text-center mb-8">Browse Categories</h2>
        <div className="category-grid">
          {[
            { id: 'coaching', title: 'Coaching', icon: <Star size={32} />, color: '#F59E0B' },
            { id: 'college', title: 'Colleges', icon: <Building size={32} />, color: '#3B82F6' },
            { id: 'other', title: 'Other', icon: <BookOpen size={32} />, color: '#10B981' }
          ].map(cat => (
            <div 
              key={cat.id} 
              className="category-card" 
              onClick={() => navigate(`/directory/${cat.id}`)}
            >
              <div className="category-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                {cat.icon}
              </div>
              <h3 className="heading-md mt-4">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Institutions */}
      <section className="featured-section bg-subtle py-12">
        <div className="container">
          <div className="flex-between mb-8">
            <h2 className="heading-lg">Featured Institutions</h2>
            <button className="btn btn-outline" onClick={() => navigate('/directory/college')}>View All</button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid-cards">
              {featured.map(inst => (
                <InstitutionCard key={inst.id} data={inst} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
