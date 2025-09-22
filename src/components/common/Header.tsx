import { useState } from 'react';
import { Menu, X, User, MapPin, MessageCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import JTlogo1 from '../../assets/JTlogo1.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useApp();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'sa', name: 'ᱥᱟᱱᱛᱟᱲᱤ' }
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: MapPin },
    { id: 'itinerary', label: 'Plan Trip', icon: MapPin },
    { id: 'guides', label: 'Guides', icon: User },
    { id: 'marketplace', label: 'Marketplace', icon: MessageCircle },
    { id: 'chatbot', label: 'Assistant', icon: MessageCircle },
    { id: 'maps', label: 'Maps', icon: MapPin },
    { id: 'login', label: 'Login / Signup', icon: User }
  ];

  if (state.user?.type === 'official') {
    navigationItems.push({ id: 'analytics', label: 'Analytics', icon: MapPin });
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div className="flex justify-between items-center px-20 h-25">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <img src={JTlogo1} alt="Logo" width={150} height={150}/>
            <div>
              <h1 className="text-3xl font-bold font-custom">JharQuest</h1>
              <p className="text-xs font-poppins">Discover • Experience • Explore</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-Poppins flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-black hover:text-white hover:bg-black'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Language Selector & User Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={state.currentLanguage}
                onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
                className="bg-green-700 text-white text-sm rounded-lg px-3 py-1 border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-emerald-800">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {state.user && (
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">{state.user.name}</div>
                  <div className="text-emerald-100 capitalize">{state.user.type}</div>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            {state.user && (
              <div className="mt-4 pt-4 border-t border-emerald-600">
                <div className="flex items-center space-x-3 px-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{state.user.name}</div>
                    <div className="text-emerald-100 capitalize text-sm">{state.user.type}</div>
                  </div>
                </div>
              </div>
            )}
          </nav>
        )}
      {/* </div> */}
    </header>
  );
}