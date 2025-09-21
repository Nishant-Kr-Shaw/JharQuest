import { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { ItineraryPlanner } from './components/itinerary/ItineraryPlanner';
import { GuideVerification } from './components/guides/GuideVerification';
import { Marketplace } from './components/marketplace/Marketplace';
import { Chatbot } from './components/chatbot/Chatbot';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import Login from './components/Login/Login';
import Maps from './components/mapping/Maps';

import "./fonts.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'itinerary':
        return <ItineraryPlanner />;
      case 'guides':
        return <GuideVerification />;
      case 'marketplace':
        return <Marketplace />;
      case 'chatbot':
        return <Chatbot />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'maps':
        return <Maps />;
      case 'login':
        return <Login />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
