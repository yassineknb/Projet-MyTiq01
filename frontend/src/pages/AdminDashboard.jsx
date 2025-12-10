import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, DollarSign, TrendingUp, Eye, Edit, Trash2, Plus, Search, Filter, BarChart3 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { api } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, events, bookings, users
  const [searchQuery, setSearchQuery] = useState('');

  // Stats de démonstration
  const stats = {
    totalRevenue: 125840,
    totalBookings: 456,
    totalUsers: 1234,
    totalEvents: 48,
    revenueChange: +12.5,
    bookingsChange: +8.2,
    usersChange: +15.3,
    eventsChange: +5.1
  };

  // Événements de démonstration
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Festival Musique 2024',
      category: 'Concert',
      date: '2025-03-15',
      price: 45,
      capacity: 500,
      sold: 320,
      status: 'active',
      revenue: 14400
    },
    {
      id: 2,
      title: 'Comédie au Rire',
      category: 'Spectacle',
      date: '2025-02-20',
      price: 80,
      capacity: 300,
      sold: 280,
      status: 'active',
      revenue: 22400
    },
    {
      id: 3,
      title: 'Concert Jazz Premium',
      category: 'Concert',
      date: '2025-04-10',
      price: 120,
      capacity: 200,
      sold: 150,
      status: 'active',
      revenue: 18000
    },
    {
      id: 4,
      title: 'Exposition Art Moderne',
      category: 'Exposition',
      date: '2024-12-20',
      price: 25,
      capacity: 400,
      sold: 400,
      status: 'past',
      revenue: 10000
    }
  ]);

  // Réservations récentes
  const recentBookings = [
    { id: 1, user: 'Ahmed Ben Ali', event: 'Festival Musique', amount: 90, date: '2025-01-28', status: 'confirmed' },
    { id: 2, user: 'Sarah Mansouri', event: 'Comédie au Rire', amount: 80, date: '2025-01-28', status: 'confirmed' },
    { id: 3, user: 'Karim Alaoui', event: 'Concert Jazz', amount: 240, date: '2025-01-27', status: 'confirmed' },
    { id: 4, user: 'Fatima Zahrae', event: 'Festival Musique', amount: 135, date: '2025-01-27', status: 'pending' },
    { id: 5, user: 'Omar Idrissi', event: 'Comédie au Rire', amount: 160, date: '2025-01-26', status: 'confirmed' }
  ];

  useEffect(() => {
    const fetchStatsAndEvents = async () => {
      try {
        const eventsRes = await api.get('/events');
        setEvents(eventsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        setLoading(false);
      }
    };
    fetchStatsAndEvents();
  }, [api]);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await api.delete(`/events/${eventId}`);
        setEvents(events.filter(e => e.id !== eventId));
      } catch (error) {
        console.error("Failed to delete event", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', label: 'Actif' },
      past: { color: 'bg-gray-100 text-gray-700', label: 'Terminé' },
      cancelled: { color: 'bg-red-100 text-red-700', label: 'Annulé' },
      pending: { color: 'bg-yellow-100 text-yellow-700', label: 'En attente' },
      confirmed: { color: 'bg-green-100 text-green-700', label: 'Confirmé' }
    };
    const badge = badges[status] || badges.active;
    return (
      <span className={`inline-block px-3 py-1 ${badge.color} rounded-full text-xs font-semibold`}>
        {badge.label}
      </span>
    );
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

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard Admin</h1>
              <p className="text-purple-100">Gérez votre plateforme d'événements</p>
            </div>
            <button
              onClick={() => navigate('/admin/events/create')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Nouvel événement
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className={`text-sm font-semibold ${stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Revenu total</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} MAD</p>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`text-sm font-semibold ${stats.bookingsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.bookingsChange >= 0 ? '+' : ''}{stats.bookingsChange}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Réservations</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          </div>

          {/* Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-semibold ${stats.usersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.usersChange >= 0 ? '+' : ''}{stats.usersChange}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Utilisateurs</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>

          {/* Events */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <span className={`text-sm font-semibold ${stats.eventsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.eventsChange >= 0 ? '+' : ''}{stats.eventsChange}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Événements</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
              { id: 'events', label: 'Événements', icon: Calendar },
              { id: 'bookings', label: 'Réservations', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition whitespace-nowrap ${activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Événements les plus performants</h3>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.sold}/{event.capacity} billets vendus</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{event.revenue.toLocaleString()} MAD</p>
                          <p className="text-sm text-gray-600">{((event.sold / event.capacity) * 100).toFixed(0)}% rempli</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Réservations récentes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Événement</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{booking.user}</td>
                            <td className="py-3 px-4">{booking.event}</td>
                            <td className="py-3 px-4 font-semibold">{booking.amount} MAD</td>
                            <td className="py-3 px-4 text-gray-600 text-sm">{booking.date}</td>
                            <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un événement..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-600 transition">
                    <Filter className="w-5 h-5" />
                    Filtrer
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                              {event.category}
                            </span>
                            {getStatusBadge(event.status)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/event/${event.id}`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Voir"
                          >
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition"
                            title="Modifier"
                          >
                            <Edit className="w-5 h-5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Date</p>
                          <p className="font-semibold text-gray-900">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Prix</p>
                          <p className="font-semibold text-gray-900">{event.price} MAD</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Billets vendus</p>
                          <p className="font-semibold text-gray-900">{event.sold}/{event.capacity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Revenu</p>
                          <p className="font-semibold text-green-600">{event.revenue.toLocaleString()} MAD</p>
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg h-2 overflow-hidden">
                        <div
                          className="bg-purple-600 h-full transition-all duration-500"
                          style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-right">
                        {((event.sold / event.capacity) * 100).toFixed(0)}% rempli
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher une réservation..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-600 transition">
                    <Filter className="w-5 h-5" />
                    Filtrer
                  </button>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Référence</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Client</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Événement</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Montant</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Statut</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-t hover:bg-gray-50">
                          <td className="py-4 px-6 font-mono text-sm">MTX-{booking.id.toString().padStart(3, '0')}</td>
                          <td className="py-4 px-6">{booking.user}</td>
                          <td className="py-4 px-6">{booking.event}</td>
                          <td className="py-4 px-6 font-semibold">{booking.amount} MAD</td>
                          <td className="py-4 px-6 text-gray-600 text-sm">{booking.date}</td>
                          <td className="py-4 px-6">{getStatusBadge(booking.status)}</td>
                          <td className="py-4 px-6">
                            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                              Détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;