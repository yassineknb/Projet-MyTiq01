import React from 'react';
import { useApp } from '../../contexts/AppContext';
import EventCard from './EventCard';
import { useNavigate } from 'react-router-dom';
const EventsSection = () => {
  const { events, selectedCategory, setSelectedCategory } = useApp();
  
  const filteredEvents = selectedCategory === 'Tous' 
    ? events 
    : events.filter(e => e.category === selectedCategory);
      const navigate = useNavigate();
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Découvrez nos événements</h2>
          <p className="text-gray-600">
            Des centaines d'événements vous attendent dans toutes les catégories
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Tous', 'Concert', 'Spectacle', 'Festival', 'Conférence'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/events')}  className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
            Voir tous les événements
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;