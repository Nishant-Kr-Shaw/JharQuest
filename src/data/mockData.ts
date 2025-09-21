import { Destination, Guide, MarketplaceItem, AnalyticsData } from '../types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Betla National Park',
    description: 'Famous for tigers, elephants, and diverse wildlife in pristine forest setting',
    category: 'Wildlife',
    location: { lat: 23.9167, lng: 84.1833 },
    images: ['https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=800'],
    rating: 4.5,
    reviews: 245,
    price: 500,
    highlights: ['Tiger Safari', 'Elephant Spotting', 'Bird Watching', 'Nature Trails'],
    arPreview: 'ar-betla-preview'
  },
  {
    id: '2',
    name: 'Hundru Falls',
    description: 'Spectacular 98-meter waterfall surrounded by rocky terrain and lush greenery',
    category: 'Natural',
    location: { lat: 23.2833, lng: 85.6167 },
    images: ['https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800'],
    rating: 4.3,
    reviews: 189,
    price: 200,
    highlights: ['Waterfall View', 'Rock Climbing', 'Photography', 'Picnic Spot'],
    arPreview: 'ar-hundru-preview'
  },
  {
    id: '3',
    name: 'Jagannath Temple Ranchi',
    description: 'Historic temple known for its architectural beauty and spiritual significance',
    category: 'Cultural',
    location: { lat: 23.3441, lng: 85.3096 },
    images: ['https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=800'],
    rating: 4.7,
    reviews: 156,
    price: 0,
    highlights: ['Temple Architecture', 'Spiritual Experience', 'Local Culture', 'Festivals'],
    arPreview: 'ar-temple-preview'
  },
  {
    id: '4',
    name: 'Tribal Heritage Museum',
    description: 'Rich collection of tribal art, culture, and traditional artifacts',
    category: 'Cultural',
    location: { lat: 23.3539, lng: 85.3386 },
    images: ['https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=800'],
    rating: 4.2,
    reviews: 98,
    price: 100,
    highlights: ['Tribal Artifacts', 'Cultural Exhibits', 'Traditional Crafts', 'History'],
    arPreview: 'ar-museum-preview'
  },
  {
    id: '5',
    name: 'Dassam Falls',
    description: 'Beautiful tiered waterfall perfect for nature lovers and photographers',
    category: 'Natural',
    location: { lat: 23.5833, lng: 85.5667 },
    images: ['https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&w=800'],
    rating: 4.4,
    reviews: 167,
    price: 150,
    highlights: ['Multi-tier Falls', 'Swimming', 'Photography', 'Nature Walk'],
    arPreview: 'ar-dassam-preview'
  }
];

export const guides: Guide[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    photo: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400',
    languages: ['English', 'Hindi', 'Bengali'],
    specialties: ['Wildlife Safari', 'Bird Watching', 'Photography'],
    rating: 4.8,
    reviews: 45,
    pricePerDay: 2000,
    verified: true,
    certifications: ['Wildlife Guide License', 'First Aid Certified'],
    experience: 8
  },
  {
    id: '2',
    name: 'Priya Sharma',
    photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    languages: ['English', 'Hindi', 'Santhali'],
    specialties: ['Cultural Tours', 'Tribal Heritage', 'Local Cuisine'],
    rating: 4.9,
    reviews: 38,
    pricePerDay: 1800,
    verified: true,
    certifications: ['Cultural Heritage Guide', 'Tourism Board Certified'],
    experience: 6
  },
  {
    id: '3',
    name: 'Amit Das',
    photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    languages: ['English', 'Hindi', 'Odia'],
    specialties: ['Adventure Sports', 'Rock Climbing', 'Trekking'],
    rating: 4.6,
    reviews: 52,
    pricePerDay: 2200,
    verified: false,
    certifications: ['Adventure Sports Certified', 'Mountain Rescue'],
    experience: 5
  }
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'Handwoven Dokra Art',
    description: 'Traditional brass craft using lost-wax casting technique',
    price: 1500,
    category: 'handicrafts',
    seller: 'Tribal Arts Collective',
    images: ['https://images.pexels.com/photos/1030945/pexels-photo-1030945.jpeg?auto=compress&cs=tinysrgb&w=400'],
    rating: 4.7,
    location: 'Ranchi',
    inStock: true
  },
  {
    id: '2',
    name: 'Eco-Friendly Homestay',
    description: 'Experience local village life with modern amenities',
    price: 800,
    category: 'homestay',
    seller: 'Green Village Homestays',
    images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'],
    rating: 4.5,
    location: 'Betla Village',
    inStock: true
  },
  {
    id: '3',
    name: 'Tribal Dance Experience',
    description: 'Interactive cultural experience with traditional Santhali dance',
    price: 500,
    category: 'experience',
    seller: 'Cultural Heritage Group',
    images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'],
    rating: 4.8,
    location: 'Dumka',
    inStock: true
  }
];

export const analyticsData: AnalyticsData = {
  totalVisitors: 15420,
  revenue: 2845000,
  topDestinations: [
    { name: 'Betla National Park', visits: 3450 },
    { name: 'Hundru Falls', visits: 2890 },
    { name: 'Jagannath Temple', visits: 2340 },
    { name: 'Dassam Falls', visits: 1890 },
    { name: 'Tribal Museum', visits: 1250 }
  ],
  sentimentDistribution: { positive: 68, neutral: 25, negative: 7 },
  monthlyTrends: [
    { month: 'Jan', visitors: 1200, revenue: 185000 },
    { month: 'Feb', visitors: 1100, revenue: 165000 },
    { month: 'Mar', visitors: 1800, revenue: 290000 },
    { month: 'Apr', visitors: 2200, revenue: 350000 },
    { month: 'May', visitors: 1900, revenue: 315000 },
    { month: 'Jun', visitors: 1400, revenue: 220000 }
  ]
};