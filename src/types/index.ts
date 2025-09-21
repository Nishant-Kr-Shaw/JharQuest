export interface User {
  id: string;
  name: string;
  email: string;
  type: 'tourist' | 'guide' | 'official';
  preferences?: TravelPreferences;
  verified?: boolean;
}

export interface TravelPreferences {
  interests: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  travelStyle: 'adventure' | 'cultural' | 'relaxation' | 'eco-tourism';
  groupSize: number;
  duration: number;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
  rating: number;
  reviews: number;
  price?: number;
  highlights: string[];
  arPreview?: string;
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  destinations: Destination[];
  duration: number;
  totalCost: number;
  createdAt: Date;
  preferences: TravelPreferences;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  pricePerDay: number;
  verified: boolean;
  certifications: string[];
  experience: number;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'handicrafts' | 'homestay' | 'experience' | 'transport';
  seller: string;
  images: string[];
  rating: number;
  location: string;
  inStock: boolean;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  destinationId?: string;
  guideId?: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
}

export interface AnalyticsData {
  totalVisitors: number;
  revenue: number;
  topDestinations: Array<{ name: string; visits: number }>;
  sentimentDistribution: { positive: number; neutral: number; negative: number };
  monthlyTrends: Array<{ month: string; visitors: number; revenue: number }>;
}