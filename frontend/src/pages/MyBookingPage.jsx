import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Download, Eye, Ticket, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { user, api } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled

  // Données de démonstration (à remplacer par l'API)
  const demoBookings = [
    {
      id: 1,
      event: {
        id: 3,
        title: 'Concert Jazz',
        date: '2025-03-15',
        time: '20:00',
        location: 'Casablanca',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
        category: 'Concert'
      },
      booking_date: '2025-01-15',
      quantity: 2,
      ticket_type: 'Standard',
      total_price: 240,
      status: 'confirmed',
      booking_reference: 'MTX-2025-001'
    },
    {
      id: 2,
      event: {
        id: 2,
        title: 'Comédie au Rire',
        date: '2025-02-20',
        time: '19:30',
        location: 'Casablanca',
        image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400',
        category: 'Spectacle'
      },
      booking_date: '2025-01-10',
      quantity: 1,
      ticket_type: 'VIP Premium',
      total_price: 176,
      status: 'confirmed',
      booking_reference: 'MTX-2025-002'
    },
    {
      id: 3,
      event: {
        id: 1,
        title: 'Festival Musique',
        date: '2024-12-20',
        time: '18:00',
        location: 'Casablanca',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
        category: 'Festival'
      },
      booking_date: '2024-12-01',
      quantity: 3,
      ticket_type: 'Standard',
      total_price: 135,
      status: 'past',
      booking_reference: 'MTX-2024-045'
    }
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    // Appel API Laravel
    const response = await api.get('/my-bookings');
    setBookings(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Erreur lors du chargement des réservations', error);
    // Si erreur, utiliser les données de démo
    setTimeout(() => {
      setBookings(demoBookings);
      setLoading(false);
    }, 500);
  }
};
  const handleDownloadTicket = async (bookingId) => {
    try {
      // Appel API pour télécharger le PDF
      // const response = await api.get(`/bookings/${bookingId}/download`, {
      //   responseType: 'blob'
      // });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `ticket-${bookingId}.pdf`);
      // document.body.appendChild(link);
      // link.click();
      
      alert(`Téléchargement du billet #${bookingId} (Fonctionnalité à connecter avec Laravel)`);
    } catch (error) {
      console.error('Erreur lors du téléchargement', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Confirmé' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'En attente' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Annulé' },
      past: { color: 'bg-gray-100 text-gray-700', icon: CheckCircle, label: 'Passé' }
    };
    
    const badge = badges[status] || badges.confirmed;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 ${badge.color} rounded-full text-xs font-semibold`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'confirmed';
    if (filter === 'past') return booking.status === 'past';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter(b => b.status === 'confirmed').length,
    past: bookings.filter(b => b.status === 'past').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Mes Réservations</h1>
          <p className="text-purple-100">Gérez tous vos billets en un seul endroit</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">À venir</p>
                <p className="text-3xl font-bold text-green-600">{stats.upcoming}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Passés</p>
                <p className="text-3xl font-bold text-gray-600">{stats.past}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Annulés</p>
                <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm mb-8 inline-flex gap-2">
          {[
            { value: 'all', label: 'Tous', count: stats.total },
            { value: 'upcoming', label: 'À venir', count: stats.upcoming },
            { value: 'past', label: 'Passés', count: stats.past },
            { value: 'cancelled', label: 'Annulés', count: stats.cancelled }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                filter === tab.value
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  
                  {/* Event Image */}
                  <div className="md:w-64 h-48 md:h-auto">
                    <img 
                      src={booking.event.image} 
                      alt={booking.event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {booking.event.category}
                          </span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{booking.event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.event.date).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{booking.event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Info */}
                    <div className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Référence</p>
                        <p className="font-semibold text-gray-900">{booking.booking_reference}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Type de billet</p>
                        <p className="font-semibold text-gray-900">{booking.ticket_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Quantité</p>
                        <p className="font-semibold text-gray-900">{booking.quantity} billet{booking.quantity > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Prix total</p>
                        <p className="font-semibold text-purple-600">{booking.total_price} MAD</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate(`/event/${booking.event.id}`)}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                        Voir l'événement
                      </button>
                      
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleDownloadTicket(booking.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                        >
                          <Download className="w-4 h-4" />
                          Télécharger le billet
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune réservation</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore de réservations dans cette catégorie.</p>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Découvrir les événements
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookingsPage;