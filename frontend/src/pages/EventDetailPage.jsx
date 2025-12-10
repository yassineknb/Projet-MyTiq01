import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Share2, Heart, ChevronDown, ChevronUp, Minus, Plus, Facebook, Twitter, Instagram, Linkedin, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import EventCard from '../components/home/EventCard';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useApp();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('standard');
  
  // Trouver l'événement par ID
  const event = events.find(e => e.id === parseInt(id));
  
  // Si l'événement n'existe pas, rediriger
  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Événement introuvable</h2>
          <p className="text-gray-600 mb-6">Cet événement n'existe pas ou a été supprimé.</p>
          <button 
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retour aux événements
          </button>
        </div>
      </div>
    );
  }
  
  // Événements similaires (même catégorie, sauf l'actuel)
  const similarEvents = events
    .filter(e => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  // Types de billets avec prix basé sur l'événement
  const basePrice = parseInt(event.price) || 45;
  const ticketTypes = [
    { 
      id: 'standard', 
      name: 'Standard', 
      price: basePrice, 
      features: ['Accès général', 'Programme inclus'] 
    },
    { 
      id: 'vip', 
      name: 'VIP Premium', 
      price: Math.round(basePrice * 2.2), 
      features: ['Accès backstage', 'Meet & Greet', 'Parking VIP', 'Cocktail offert'] 
    },
  ];

  const selectedTicketInfo = ticketTypes.find(t => t.id === selectedTicket);
  const total = selectedTicketInfo.price * quantity;

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  // Mapping des couleurs
  const colorMap = {
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-rose-600',
    orange: 'from-orange-600 to-red-600',
    blue: 'from-blue-600 to-indigo-600',
  };

  const gradientColor = colorMap[event.color] || 'from-purple-600 to-pink-600';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className={`relative h-64 bg-gradient-to-r ${gradientColor} overflow-hidden`}>
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
              {event.category}
            </span>
            <span className="text-white text-sm">Casablanca, Maroc</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <p className="text-white/90 text-lg">{event.date} - 20:00 PM - 23:00 PM</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Event Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">À propos de l'événement</h2>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                  Signaler
                </button>
              </div>
              
              <div className={`text-gray-600 leading-relaxed ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                <p className="mb-4">
                  {event.title} revient pour une édition exceptionnelle ! Plongez dans l'univers du {event.category.toLowerCase()} avec des artistes internationaux renommés. Une soirée inoubliable vous attend dans un cadre intimiste et chaleureux.
                </p>
                <p className="mb-4">
                  Au programme : performances live, rencontres avec les artistes, et une ambiance unique. Que vous soyez amateur ou passionné, cette soirée saura vous séduire.
                </p>
                <p>
                  Le lieu dispose d'un bar complet avec cocktails signature, ainsi que d'une restauration sur place. L'acoustique exceptionnelle de la salle garantit une expérience optimale.
                </p>
              </div>
              
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-purple-600 font-semibold flex items-center gap-2 hover:text-purple-700"
              >
                {showFullDescription ? (
                  <>Voir moins <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Voir plus <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>

            {/* Key Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ce qu'il faut savoir</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Date et heure</div>
                    <div className="text-gray-600 text-sm">{event.date}, 20:00 - 23:00</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lieu</div>
                    <div className="text-gray-600 text-sm">Casablanca, Maroc</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Capacité</div>
                    <div className="text-gray-600 text-sm">500 personnes maximum</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                ⚠️ Informations importantes
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Les billets sont nominatifs et non remboursables</li>
                <li>• Présentation d'une pièce d'identité obligatoire</li>
                <li>• Vestiaire disponible sur place</li>
                <li>• Réservé aux plus de 18 ans</li>
              </ul>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partager cet événement</h3>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Facebook className="w-5 h-5" />
                  <span className="font-semibold hidden sm:inline">Facebook</span>
                </button>
                <button className="flex-1 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition flex items-center justify-center gap-2">
                  <Twitter className="w-5 h-5" />
                  <span className="font-semibold hidden sm:inline">Twitter</span>
                </button>
                <button className="flex-1 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition flex items-center justify-center gap-2">
                  <Instagram className="w-5 h-5" />
                  <span className="font-semibold hidden sm:inline">Instagram</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Select Tickets</h3>
                  <button className="text-purple-600 hover:text-purple-700">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  {ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition ${
                        selectedTicket === ticket.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-bold text-gray-900">{ticket.name}</div>
                          {ticket.id === 'standard' && (
                            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full mt-1">
                              Available
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{ticket.price} MAD</div>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {ticket.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 hover:text-purple-600 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center text-xl font-bold border-2 border-gray-300 rounded-lg py-2"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-purple-600 hover:text-purple-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{selectedTicketInfo.price * quantity} MAD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span className="font-semibold">5 MAD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-purple-600">{total + 5} MAD</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={() => {
                    if (!isAuthenticated()) {
                      navigate('/login', { state: { from: `/event/${event.id}` } });
                    } else {
                      navigate('/checkout', {
                        state: {
                          event,
                          ticketType: selectedTicketInfo,
                          quantity,
                          total: total + 5
                        }
                      });
                    }
                  }}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl mb-4"
                >
                  Checkout
                </button>

                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Have a promo code?
                </button>

                {/* Organizer Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Organisé par</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">MY</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">MyTix Events</div>
                      <div className="text-xs text-gray-500">Organisateur vérifié ✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements similaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailPage;