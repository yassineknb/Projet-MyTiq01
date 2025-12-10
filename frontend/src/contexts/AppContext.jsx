import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  // Récupérer les événements depuis Laravel
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des événements', error);
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ 
      events, 
      setEvents,
      selectedCategory, 
      setSelectedCategory,
      loading,
      refreshEvents: fetchEvents 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé dans AppProvider');
  }
  return context;
};