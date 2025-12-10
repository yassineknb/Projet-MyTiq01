import React, { useState } from 'react';
import { Mail, Bell, Gift, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    // Appel API Laravel
    const response = await axios.post('http://localhost:8000/api/newsletter/subscribe', {
      email: email
    });
    
    setSubscribed(true);
    setLoading(false);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Restez informé des meilleurs événements
          </h1>
          <p className="text-xl text-purple-100">
            Abonnez-vous à notre newsletter et ne manquez plus jamais un événement exceptionnel près de chez vous.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-dashed border-blue-300">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                <Bell className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Événements en avant-première
              </h3>
              <p className="text-gray-600 text-sm">
                Soyez informés des nouveaux événements avant leur publication officielle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                <Gift className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Offres exclusives
              </h3>
              <p className="text-gray-600 text-sm">
                Profitez de réductions et d'offres spéciales réservées aux abonnés.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Sélection personnalisée
              </h3>
              <p className="text-gray-600 text-sm">
                Recevez des recommandations adaptées à vos préférences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-dashed border-blue-300">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Recevez des mises à jour et des événements exclusifs directement dans votre boîte mail.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  S'inscrire
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                En vous abonnant, vous acceptez de recevoir nos emails et confirmez avoir lu notre{' '}
                <a href="#" className="text-purple-600 hover:underline">politique de confidentialité</a> et nos{' '}
                <a href="#" className="text-purple-600 hover:underline">conditions d'utilisation</a>.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Merci de votre inscription !
              </h3>
              <p className="text-gray-600">
                Vous allez recevoir un email de confirmation à {email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-dashed border-blue-300">
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Abonnés satisfaits</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Événements par mois</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Ce que vous recevrez
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Calendrier mensuel</h3>
                  <p className="text-gray-600 text-sm">
                    Un aperçu complet des événements du mois à venir.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Codes promo exclusifs</h3>
                  <p className="text-gray-600 text-sm">
                    Des réductions spéciales réservées aux abonnés.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Tendances du moment</h3>
                  <p className="text-gray-600 text-sm">
                    Les événements les plus populaires de la semaine.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Communauté exclusive</h3>
                  <p className="text-gray-600 text-sm">
                    Accès prioritaire aux événements et rencontres.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsletterPage;