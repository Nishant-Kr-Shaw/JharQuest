import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Itinerary, Guide, MarketplaceItem, ChatMessage, Feedback } from '../types';

interface AppState {
  user: User | null;
  itineraries: Itinerary[];
  guides: Guide[];
  marketplaceItems: MarketplaceItem[];
  chatMessages: ChatMessage[];
  feedbacks: Feedback[];
  currentLanguage: string;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_ITINERARY'; payload: Itinerary }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'ADD_FEEDBACK'; payload: Feedback }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'UPDATE_GUIDE_VERIFICATION'; payload: { guideId: string; verified: boolean } };

const initialState: AppState = {
  user: null,
  itineraries: [],
  guides: [],
  marketplaceItems: [],
  chatMessages: [],
  feedbacks: [],
  currentLanguage: 'en'
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_ITINERARY':
      return { ...state, itineraries: [...state.itineraries, action.payload] };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'ADD_FEEDBACK':
      return { ...state, feedbacks: [...state.feedbacks, action.payload] };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'UPDATE_GUIDE_VERIFICATION':
      return {
        ...state,
        guides: state.guides.map(guide =>
          guide.id === action.payload.guideId
            ? { ...guide, verified: action.payload.verified }
            : guide
        )
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}