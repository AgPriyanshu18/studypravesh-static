import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { categories, locations } from '../data/mockData';
import InstitutionCard from '../components/InstitutionCard';
import { fetchInstitutions } from '../utils/api';

const Directory = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  
  const initialSearch = searchParams.get('search') || '';
  const initialLoc = searchParams.get('loc') || 'All India';

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [loading, setLoading] = useState(true);
  
  const typeMap = {
    coaching: 'Coaching',
    college: 'Colleges',
    other: 'Other'
  };

  const pageTitle = typeMap[type] || 'Institutions';
  const subCategories = type ? categories[type] : [];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchInstitutions();
      setAllData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (allData.length === 0) return;

    // Filter logic
    let result = allData;
    
    // Filter by type if provided in route
    if (type && type !== 'all') {
      result = result.filter(item => item.type === type);
    }

    // Filter by category (using .includes for comma-separated categories)
    if (activeCategory !== 'All') {
      result = result.filter(item => 
        (item.category || '').toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Basic search filtering (if navigated from home)
    if (initialSearch) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(initialSearch.toLowerCase()) || 
        item.category.toLowerCase().includes(initialSearch.toLowerCase())
      );
    }
    
    if (selectedLocation && selectedLocation !== 'All India') {
      result = result.filter(item => item.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    setFilteredData(result);
  }, [allData, type, activeCategory, initialSearch, selectedLocation]);

  return (
    <div className="directory-page container animate-fade-in py-8">
      <div className="directory-header mb-8">
        <h1 className="heading-xl">{pageTitle}</h1>
        {!loading && <p className="text-muted">Showing {filteredData.length} results</p>}
      </div>

      <div className="directory-layout">
        <aside className="sidebar">
          <div className="filter-card">
            <div className="flex-between mb-4">
              <h3 className="heading-sm flex-center gap-2"><Filter size={18}/> Filters</h3>
            </div>
            
            <div className="filter-group mb-6">
              <h4 className="filter-title mb-2">Category</h4>
              <div className="filter-options">
                <button 
                  className={`filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('All')}
                >
                  All
                </button>
                {subCategories?.map(cat => (
                  <button 
                    key={cat}
                    className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-title mb-2">Location</h4>
              <select 
                className="filter-select w-full"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {['All India', 'Jaipur', 'Bhilwara', 'Bikaner', 'Jalandhar', 'Ludhiana', 'Ajmer', 'Noida', 'Chennai'].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <main className="directory-results">
          <div className="results-toolbar mb-6 flex-between">
            <div className="sort-by">
              <span className="text-muted mr-2">Sort by:</span>
              <select className="sort-select">
                <option>Popularity</option>
                <option>Rating (High to Low)</option>
                <option>Fees (Low to High)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading institutions from API...</div>
          ) : filteredData.length > 0 ? (
            <div className="grid-cards">
              {filteredData.map(inst => (
                <InstitutionCard key={inst.id} data={inst} />
              ))}
            </div>
          ) : (
            <div className="no-results text-center py-12">
              <div className="text-muted mb-4">No institutions found matching your criteria.</div>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Directory;
