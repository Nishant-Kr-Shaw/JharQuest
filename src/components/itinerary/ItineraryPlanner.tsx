import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Clock, Star, ArrowRight } from 'lucide-react';
import { destinations } from '../../data/mockData';
import { useApp } from '../../contexts/AppContext';
import { TravelPreferences, Itinerary } from '../../types';

export function ItineraryPlanner() {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TravelPreferences>({
    interests: [],
    budget: 'mid-range',
    travelStyle: 'cultural',
    groupSize: 2,
    duration: 3
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Wildlife Safari', 'Waterfalls', 'Cultural Sites', 'Adventure Sports',
    'Tribal Heritage', 'Photography', 'Nature Walks', 'Temples',
    'Museums', 'Local Cuisine', 'Handicrafts', 'Festivals'
  ];

  const travelStyles = [
    { id: 'adventure', name: 'Adventure', icon: '🏔️', description: 'Thrilling outdoor activities' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️', description: 'Rich heritage and traditions' },
    { id: 'relaxation', name: 'Relaxation', icon: '🧘', description: 'Peaceful and rejuvenating' },
    { id: 'eco-tourism', name: 'Eco-Tourism', icon: '🌿', description: 'Sustainable nature experiences' }
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Filter destinations based on preferences
    const filteredDestinations = destinations.filter(dest => {
      const matchesInterests = preferences.interests.some(interest => 
        dest.highlights.some(highlight => 
          highlight.toLowerCase().includes(interest.toLowerCase()) ||
          dest.category.toLowerCase().includes(interest.toLowerCase())
        )
      );
      return matchesInterests || preferences.interests.length === 0;
    });

    // Generate itinerary
    const selectedDestinations = filteredDestinations
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(preferences.duration, 5));

    const totalCost = selectedDestinations.reduce((sum, dest) => sum + (dest.price || 0), 0) * preferences.groupSize;

    const newItinerary: Itinerary = {
      id: Date.now().toString(),
      userId: state.user?.id || '',
      title: `${preferences.duration}-Day Jharkhand Adventure`,
      destinations: selectedDestinations,
      duration: preferences.duration,
      totalCost,
      createdAt: new Date(),
      preferences
    };

    setGeneratedItinerary(newItinerary);
    setIsGenerating(false);
  };

  const saveItinerary = () => {
    if (generatedItinerary) {
      dispatch({ type: 'ADD_ITINERARY', payload: generatedItinerary });
      // Show success message or redirect
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI create a personalized itinerary based on your preferences and interests
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNum
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Interests */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 text-emerald-600 mr-2" />
              What interests you most?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                    preferences.interests.includes(interest)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Travel Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-emerald-600 mr-2" />
              Tell us about your trip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Travel Style */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Travel Style
                </label>
                <div className="space-y-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id as TravelPreferences['travelStyle'] }))}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        preferences.travelStyle === style.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{style.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{style.name}</div>
                          <div className="text-sm text-gray-600">{style.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Details */}
              <div className="space-y-6">
                {/* Budget */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Budget Range
                  </label>
                  <select
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value as TravelPreferences['budget'] }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="budget">Budget (₹500-1500/day)</option>
                    <option value="mid-range">Mid-range (₹1500-3000/day)</option>
                    <option value="luxury">Luxury (₹3000+/day)</option>
                  </select>
                </div>

                {/* Group Size */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Group Size
                  </label>
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-gray-500" />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={preferences.groupSize}
                      onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Trip Duration (days)
                  </label>
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={preferences.duration}
                      onChange={(e) => setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Generate Itinerary</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Generated Itinerary */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {!generatedItinerary && !isGenerating && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to generate your itinerary!</h2>
                <button
                  onClick={generateItinerary}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Generate AI Itinerary
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating your perfect itinerary...</h3>
                <p className="text-gray-600">Our AI is analyzing your preferences and matching the best destinations</p>
              </div>
            )}

            {generatedItinerary && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 text-emerald-600 mr-2" />
                  Your Personalized Itinerary
                </h2>

                {/* Itinerary Summary */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{generatedItinerary.duration}</div>
                      <div className="text-gray-600">Days</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{generatedItinerary.destinations.length}</div>
                      <div className="text-gray-600">Destinations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">₹{generatedItinerary.totalCost.toLocaleString()}</div>
                      <div className="text-gray-600">Total Cost</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{preferences.groupSize}</div>
                      <div className="text-gray-600">People</div>
                    </div>
                  </div>
                </div>

                {/* Destinations */}
                <div className="space-y-6">
                  {generatedItinerary.destinations.map((destination, index) => (
                    <div key={destination.id} className="border rounded-xl overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={destination.images[0]}
                          alt={destination.name}
                          className="w-full md:w-48 h-48 object-cover"
                        />
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Day {index + 1}: {destination.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                  <span>{destination.rating}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{destination.category}</span>
                                </div>
                                {destination.price && (
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    <span>₹{destination.price}/person</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{destination.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {destination.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t">
                  <button
                    onClick={saveItinerary}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex-1"
                  >
                    Save Itinerary
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setGeneratedItinerary(null);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex-1"
                  >
                    Create New Itinerary
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}