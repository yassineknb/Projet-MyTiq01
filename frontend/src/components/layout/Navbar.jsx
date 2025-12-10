import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, Ticket, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-purple-600 cursor-pointer hover:text-purple-700 transition"
          >
            🎫 MyTiq
          </h1>
          <div className="hidden md:flex gap-6 text-sm">
            <button onClick={() => navigate('/events')} className="hover:text-purple-600 ">
              Tous les événements
            </button>
             <button onClick={() => navigate('/')} className="hover:text-purple-600">fonctionnalités</button>
            <button onClick={() => navigate('/newsletter')} className="hover:text-purple-600">Newsletter</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm hover:text-purple-600">Français</button>
          
          {isAuthenticated() ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    {isAdmin() && (
                      <button
                        onClick={() => {
                          navigate('/admin/dashboard');
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-left transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Dashboard Admin</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        navigate('/my-bookings');
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition"
                    >
                      <Ticket className="w-4 h-4" />
                      <span className="text-sm">Mes réservations</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Mon profil</span>
                    </button>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-left transition text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Connexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;