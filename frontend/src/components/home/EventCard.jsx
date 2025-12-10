import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  
  const colorClasses = {
    purple: 'from-purple-500 to-purple-700',
    pink: 'from-pink-500 to-pink-700',
    orange: 'from-orange-500 to-orange-700',
    blue: 'from-blue-500 to-blue-700',
  };

  const handleReserve = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <h3 className="font-bold text-lg mb-3">{event.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-purple-600 font-bold text-lg">{event.price}</span>
          <button 
            onClick={handleReserve}
            className={`px-4 py-2 bg-gradient-to-r ${colorClasses[event.color]} text-white rounded-lg text-sm font-semibold hover:opacity-90 transition`}
          >
            Acheter un billet 
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;