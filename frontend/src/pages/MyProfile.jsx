import React, { useState } from 'react';
import { User, Mail, Lock, Camera, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, api } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // profile, security
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    city: 'Casablanca',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
    setSuccess('');
  };

 const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    // Appel API Laravel
    const response = await api.put('/user/profile', profileData);
    
    setSuccess('Profil mis à jour avec succès !');
    setLoading(false);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    setLoading(false);
  }
};

  const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  // Validation
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setError('Les nouveaux mots de passe ne correspondent pas');
    setLoading(false);
    return;
  }

  if (passwordData.newPassword.length < 8) {
    setError('Le mot de passe doit contenir au moins 8 caractères');
    setLoading(false);
    return;
  }

  try {
    // Appel API Laravel
    const response = await api.put('/user/password', {
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
      new_password_confirmation: passwordData.confirmPassword
    });
    
    setSuccess('Mot de passe modifié avec succès !');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setLoading(false);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe');
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Mon Profil</h1>
          <p className="text-purple-100">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border-2 border-dashed border-blue-200">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Compte vérifié ✓
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'profile'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Informations personnelles
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'security'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Sécurité
              </div>
            </button>
          </div>

          <div className="p-8">
            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville
                    </label>
                    <select
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    >
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Fès">Fès</option>
                      <option value="Tanger">Tanger</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  {loading ? 'Modification...' : 'Modifier le mot de passe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-red-900 mb-2">Zone dangereuse</h3>
          <p className="text-red-700 mb-4 text-sm">
            Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            Supprimer mon compte
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;