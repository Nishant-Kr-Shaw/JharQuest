import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, MapPin, Heart } from 'lucide-react';
import { marketplaceItems } from '../../data/mockData';
export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Items', count: marketplaceItems.length },
    { id: 'handicrafts', name: 'Handicrafts', count: marketplaceItems.filter(item => item.category === 'handicrafts').length },
    { id: 'homestay', name: 'Homestays', count: marketplaceItems.filter(item => item.category === 'homestay').length },
    { id: 'experience', name: 'Experiences', count: marketplaceItems.filter(item => item.category === 'experience').length },
    { id: 'transport', name: 'Transport', count: marketplaceItems.filter(item => item.category === 'transport').length }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => prev.includes(itemId) ? prev : [...prev, itemId]);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <ShoppingCart className="h-4 w-4" />
            <span>Local Marketplace</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Local Treasures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support local communities through authentic handicrafts, unique experiences, and comfortable stays
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                          : 'text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Cart</span>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">
                      {cart.length}
                    </span>
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition-colors">
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredItems.length} of {marketplaceItems.length} items
              </p>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>Sort by Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                        favorites.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </div>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="text-xl font-bold text-orange-600">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sold by:</span> {item.seller}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(item.id)}
                        disabled={!item.inStock || cart.includes(item.id)}
                        className={`w-full py-3 rounded-lg font-medium transition-colors ${
                          !item.inStock
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : cart.includes(item.id)
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                      >
                        {!item.inStock
                          ? 'Out of Stock'
                          : cart.includes(item.id)
                          ? 'Added to Cart'
                          : 'Add to Cart'
                        }
                      </button>
                      <button className="w-full py-3 border border-orange-600 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}