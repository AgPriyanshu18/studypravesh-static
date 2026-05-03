export const institutions = [
  {
    id: 'srm-kancheepuram',
    name: 'The SRM University Kancheepuram',
    type: 'university',
    category: 'Engineering',
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    fees: 250000,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A premier engineering institution known for top-tier placements and world-class infrastructure.',
    courses: ['B.Tech', 'M.Tech', 'MBA', 'Ph.D']
  },
  {
    id: 'amity-noida',
    name: 'Amity University, Greater Noida',
    type: 'university',
    category: 'Private',
    location: 'Delhi NCR',
    rating: 4.5,
    fees: 300000,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Renowned for its vast campus, global exposure programs, and multidisciplinary courses.',
    courses: ['BBA', 'MBA', 'B.Tech', 'Law']
  },
  {
    id: 'meritto-jaipur',
    name: 'Meritto Coaching Institute',
    type: 'coaching',
    category: 'IIT JEE / Medical',
    location: 'Jaipur, Rajasthan',
    rating: 4.9,
    fees: 120000,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'The finest coaching for JEE Mains, Advanced, and NEET with a stellar success record.',
    courses: ['JEE Main', 'NEET', 'Foundation']
  },
  {
    id: 'aurobindo-jaipur',
    name: 'Aurobindo International School',
    type: 'school',
    category: 'Senior Secondary',
    location: 'Sirsi Road, Jaipur',
    rating: 4.6,
    fees: 80000,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Fostering holistic development and academic excellence from primary to senior secondary levels.',
    courses: ['Class I - XII', 'CBSE']
  },
  {
    id: 'engineers-academy',
    name: 'Engineers Academy',
    type: 'coaching',
    category: 'GATE / PSU',
    location: 'Jaipur, Rajasthan',
    rating: 4.7,
    fees: 65000,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Specialized coaching for GATE, IES, and PSU aspirants with highly experienced faculty.',
    courses: ['GATE', 'IES', 'JEN']
  },
  {
    id: 'maharishi-arvind',
    name: 'Maharishi Arvind University',
    type: 'university',
    category: 'Private',
    location: 'Jaipur, Rajasthan',
    rating: 4.2,
    fees: 150000,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A growing hub of education offering diverse undergraduate and postgraduate programs.',
    courses: ['Pharmacy', 'Management', 'Law']
  }
];

export const locations = [
  'All India', 'Jaipur, Rajasthan', 'Delhi NCR', 'Chennai, Tamil Nadu', 'Mumbai, Maharashtra', 'Bangalore, Karnataka'
];

export const categories = {
  coaching: ['Engineering', 'Medical', 'GATE', 'IAS', 'Bank', 'SSC', 'Law'],
  college: ['Engineering', 'Medical', 'Management', 'Arts / Science'],
  other: ['School', 'University', 'General']
};
