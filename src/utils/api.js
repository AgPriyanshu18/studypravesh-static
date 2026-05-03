import Papa from 'papaparse';

export const fetchInstitutions = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/data/institutes.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const mappedData = results.data.map(item => {
          let imageUrl = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
          if (item.image && item.image.trim() !== '') {
             imageUrl = item.image;
          }

          let type = 'other';
          const catLower = (item.category || '').toLowerCase();
          if (catLower.includes('coaching')) type = 'coaching';
          else if (catLower.includes('college') || catLower.includes('engineering') || catLower.includes('medical') || catLower.includes('management')) type = 'college';

          return {
            id: item.id || Math.random().toString(),
            name: item.name || 'Unnamed Institution',
            type: type,
            category: item.category || 'General',
            location: item.address || item.location || 'India',
            rating: item.rating ? parseFloat(item.rating) : 4.5,
            fees: item.fees ? parseInt(item.fees, 10) : 0,
            image: imageUrl,
            description: item.description || 'A premier educational institution dedicated to excellence.',
            courses: ['General']
          };
        });
        resolve(mappedData);
      },
      error: (error) => {
        console.error("Failed to parse institutes CSV:", error);
        resolve([]); // Fallback to empty array
      }
    });
  });
};

export const fetchBulletins = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/data/bulletins.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        console.error("Failed to parse bulletins CSV:", error);
        resolve([]);
      }
    });
  });
};
