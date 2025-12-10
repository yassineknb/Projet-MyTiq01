import React from 'react';
import { Music, Palette, Trophy, ArrowRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-20 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-700">Plateforme moderne de billetterie</span>
            </div>
            
            <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">
              Achetez vos billets<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                en toute simplicité
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              MyTiq est la plateforme qui révolutionne l'achat de billets événementiels. 
              Découvrez, achetez et gérez vos billets facilement.
            </p>
            
            <button 
              onClick={() => navigate('/events')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Découvrir les événements</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Right Side - Events Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Événements populaires</h3>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              {/* Event Items */}
              <div className="space-y-4">
                {/* Event 1 */}
                <div 
                  onClick={() => navigate('/event/3')}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-md transition cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-lg">Festival de Musique 2024</h4>
                    <p className="text-sm text-gray-600">15 Mars 2024 • Paris</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">49€</div>
                    <div className="text-xs text-gray-500">150 places</div>
                  </div>
                </div>

                {/* Event 2 */}
                <div 
                  onClick={() => navigate('/event/2')}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl hover:shadow-md transition cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-lg">Exposition d'Art Moderne</h4>
                    <p className="text-sm text-gray-600">22 Mars 2024 • Lyon</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600">25€</div>
                    <div className="text-xs text-gray-500">80 places</div>
                  </div>
                </div>

                {/* Event 3 */}
                <div 
                  onClick={() => navigate('/event/4')}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-md transition cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-lg">Tournoi E-Sport</h4>
                    <p className="text-sm text-gray-600">30 Mars 2024 • Marseille</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">35€</div>
                    <div className="text-xs text-gray-500">200 places</div>
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <button 
                onClick={() => navigate('/events')}
                className="w-full mt-6 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 group"
              >
                <span>Voir tous les événements</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm">
              🔥 Nouveauté
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;