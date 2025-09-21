import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Volume2, Mic, MapPin, Calendar, Info } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ChatMessage } from '../../types';

export function Chatbot() {
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { text: 'Plan a 3-day trip', icon: Calendar },
    { text: 'Best waterfalls to visit', icon: MapPin },
    { text: 'Local food recommendations', icon: Info },
    { text: 'Book a guide', icon: User },
    { text: 'Tribal heritage sites', icon: Info },
    { text: 'Adventure activities', icon: MapPin }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'sa', name: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🏺' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages]);

  useEffect(() => {
    if (state.chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Hello! I'm your AI travel assistant for Jharkhand. I can help you with:
        
• Planning personalized itineraries
• Booking verified guides
• Finding local experiences
• Real-time travel information
• Cultural insights and recommendations

How can I assist you today?`,
        timestamp: new Date(),
        language: state.currentLanguage
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: welcomeMessage });
    }
  }, []);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
      language: state.currentLanguage
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));

    let botResponse = '';
    const lowerMessage = messageText.toLowerCase();

    if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary')) {
      botResponse = `I'd be happy to help you plan your Jharkhand adventure! 🗺️

Based on popular destinations, I recommend:

🏔️ **Day 1: Ranchi & Surroundings**
- Jagannath Temple (cultural site)
- Tribal Heritage Museum
- Local market exploration

🌊 **Day 2: Waterfall Adventure**
- Hundru Falls (98m spectacular waterfall)
- Jonha Falls nearby
- Photography and nature walks

🐅 **Day 3: Wildlife Experience**
- Betla National Park
- Tiger safari and elephant spotting
- Bird watching

Would you like me to customize this based on your specific interests and budget?`;
    } else if (lowerMessage.includes('waterfall')) {
      botResponse = `Jharkhand is blessed with magnificent waterfalls! 🌊

**Top Waterfalls to Visit:**

1. **Hundru Falls** (98m)
   - Most famous waterfall near Ranchi
   - Best time: July-December
   - Activities: Photography, rock climbing

2. **Dassam Falls**
   - Beautiful tiered waterfall
   - Swimming friendly
   - Great for picnics

3. **Jonha Falls**
   - Hidden gem with natural pools
   - Less crowded, perfect for nature lovers

4. **Panch Gagh Falls**
   - Five-stream waterfall system
   - Adventure trekking required

Would you like detailed directions or help booking transport to any of these?`;
    } else if (lowerMessage.includes('food') || lowerMessage.includes('cuisine')) {
      botResponse = `Jharkhand's cuisine is a delightful blend of tribal and traditional flavors! 🍽️

**Must-Try Local Dishes:**

🍚 **Traditional Staples:**
- Dhuska (rice pancakes)
- Litti Chokha (stuffed wheat balls)
- Pitha (rice cakes)

🥘 **Tribal Specialties:**
- Rugra (mushroom curry)
- Bamboo shoot preparations
- Wild leafy vegetables (saag)

🍖 **Non-Vegetarian:**
- Mutton curry (local style)
- Fresh river fish preparations

🍯 **Drinks & Sweets:**
- Handia (traditional rice beer)
- Gur (jaggery-based sweets)
- Anarasa (rice flour sweet)

I can help you find authentic restaurants or connect you with cooking experience tours!`;
    } else if (lowerMessage.includes('guide') || lowerMessage.includes('book')) {
      botResponse = `I can help you find the perfect verified guide! 👨‍🦳

**Available Verified Guides:**

🌟 **Ravi Kumar** (4.8⭐)
- Specializes in Wildlife Safari, Bird Watching
- Languages: English, Hindi, Bengali
- ₹2,000/day

🌟 **Priya Sharma** (4.9⭐)
- Expert in Cultural Tours, Tribal Heritage
- Languages: English, Hindi, Santhali
- ₹1,800/day

🌟 **Amit Das** (4.6⭐)
- Adventure Sports, Rock Climbing
- Languages: English, Hindi, Odia
- ₹2,200/day

All guides are blockchain-verified for your security. Would you like to book one or get more details?`;
    } else if (lowerMessage.includes('heritage') || lowerMessage.includes('tribal') || lowerMessage.includes('culture')) {
      botResponse = `Jharkhand's tribal heritage is incredibly rich and diverse! 🏺

**Cultural Highlights:**

🏛️ **Museums & Centers:**
- Tribal Heritage Museum, Ranchi
- Folk Art & Cultural Center
- Traditional craft villages

🎭 **Cultural Experiences:**
- Santhali dance performances
- Traditional music sessions
- Handicraft workshops

🎨 **Art Forms:**
- Dokra metal craft (lost-wax casting)
- Sohrai and Khovar paintings
- Bamboo and cane work
- Handloom textiles

📅 **Festivals to Experience:**
- Sarhul (spring festival)
- Karma (harvest festival)
- Sohrai (harvest & cattle festival)

I can arrange cultural immersion experiences with local communities. Interested?`;
    } else {
      botResponse = `I understand you're interested in exploring Jharkhand! 🌟

Let me help you with:
✈️ Trip planning and itineraries
🏨 Accommodation recommendations
🚗 Transportation options
👨‍🦳 Verified guide bookings
📍 Destination information
🍽️ Local food experiences
🎨 Cultural activities

Please let me know what specific aspect you'd like help with, and I'll provide detailed assistance!

You can also use the quick action buttons below for common queries.`;
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      language: state.currentLanguage
    };
    
    setIsTyping(false);
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: botMessage });
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage("Tell me about Betla National Park");
    }, 2000);
  };

  const translateMessage = (content: string) => {
    // Simulate translation based on selected language
    if (state.currentLanguage === 'hi') {
      return content.replace(/Hello/g, 'नमस्ते').replace(/Thank you/g, 'धन्यवाद');
    }
    return content;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
       <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Bot className="h-4 w-4" />
            <span>AI Travel Assistant</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Jharkhand Travel Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized recommendations, real-time information, and instant support
          </p>
       </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Language Selector */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Language:</span>
              </div>
              <select
                value={state.currentLanguage}
                onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
           {state.chatMessages.map((message) => (
             <div
               key={message.id}
               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div
                 className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                   message.type === 'user'
                     ? 'bg-blue-600 text-white'
                     : 'bg-gray-100 text-gray-900'
                 }`}
               >
                 <div className="flex items-start space-x-2">
                   {message.type === 'bot' && (
                     <Bot className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                   )}
                   {message.type === 'user' && (
                     <User className="h-5 w-5 text-blue-100 flex-shrink-0 mt-0.5" />
                   )}
                   <div className="flex-1">
                     <div className="whitespace-pre-line text-sm">
                       {translateMessage(message.content)}
                      </div>
                     <div className="flex items-center justify-between mt-2">
                       <div
                         className={`text-xs ${
                           message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                         }`}
                       >
                         {message.timestamp.toLocaleTimeString([], {
                           hour: '2-digit',
                           minute: '2-digit'
                         })}
                       </div>
                       {message.type === 'bot' && (
                         <button className="text-gray-500 hover:text-gray-700">
                           <Volume2 className="h-3 w-3" />
                         </button>
                       )}
                     </div>
                    </div>
                  </div>
               </div>
             </div>
           ))}

            {isTyping && (
             <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</h4>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.text)}
                    className="inline-flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <action.icon className="h-4 w-4 text-gray-600" />
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-full transition-colors ${
                  isListening
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mic className="h-5 w-5" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Type your message in ${languages.find(l => l.code === state.currentLanguage)?.name}...`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI assistant powered by advanced natural language processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}