import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EventCard from '../components/home/EventCard';
import { useApp } from '../contexts/AppContext';

const EventsPage = () => {
  const { events } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [priceRange, setPriceRange] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Categories
  const categories = ['Tous', 'Concert', 'Spectacle', 'Festival', 'Conférence', 'Sport', 'Théâtre'];
  
  // Cities
  const cities = ['Toutes', 'Paris', 'Lyon', 'Marseille', 'Casablanca', 'Rabat'];

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || event.category === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (priceRange === 'free') matchesPrice = event.price.toLowerCase().includes('gratuit');
    if (priceRange === 'low') matchesPrice = parseInt(event.price) < 50;
    if (priceRange === 'medium') matchesPrice = parseInt(event.price) >= 50 && parseInt(event.price) <= 100;
    if (priceRange === 'high') matchesPrice = parseInt(event.price) > 100;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Découvrez tous nos événements
          </h1>
          <p className="text-xl text-purple-100 text-center mb-8">
            Plus de 300 événements disponibles près de chez vous
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Rechercher un événement, un artiste, un lieu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-4 outline-none text-lg"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              
              {/* Filter Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-dashed border-blue-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtres
                  </h3>
                  <button 
                    onClick={() => {
                      setSelectedCategory('Tous');
                      setSelectedCity('Toutes');
                      setPriceRange('all');
                      setDateFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Réinitialiser
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Catégories
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          selectedCategory === cat
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cities */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ville
                  </h4>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Prix
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tous les prix' },
                      { value: 'free', label: 'Gratuit' },
                      { value: 'low', label: 'Moins de 50 MAD' },
                      { value: 'medium', label: '50 - 100 MAD' },
                      { value: 'high', label: 'Plus de 100 MAD' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      >
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          checked={priceRange === option.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Filter */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Toutes les dates' },
                      { value: 'today', label: "Aujourd'hui" },
                      { value: 'week', label: 'Cette semaine' },
                      { value: 'month', label: 'Ce mois-ci' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      >
                        <input
                          type="radio"
                          name="date"
                          value={option.value}
                          checked={dateFilter === option.value}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">🎉 Offre spéciale !</h3>
                <p className="text-sm mb-4">
                  -20% sur votre première réservation avec le code BIENVENUE20
                </p>
                <button className="w-full py-2 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition">
                  J'en profite
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-purple-700 transition"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
              <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Filtres</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Same filters as sidebar */}
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
              </h2>
              <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none">
                <option>Plus récents</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Popularité</option>
              </select>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'Tous' || searchQuery) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory !== 'Tous' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('Tous')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Aucun événement trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Tous');
                    setSearchQuery('');
                    setPriceRange('all');
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredEvents.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition">
                  Précédent
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition ${
                      page === 1
                        ? 'bg-purple-600 text-white'
                        : 'border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition">
                  Suivant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventsPage;