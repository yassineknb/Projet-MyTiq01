import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle2, AlertCircle, Calendar, MapPin, Ticket } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, api, isAuthenticated } = useAuth();
  
  // Données passées depuis EventDetailPage
  const { event, ticketType, quantity, total } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Info, 2: Paiement, 3: Confirmation

  const [billingData, setBillingData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Casablanca',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Redirection si pas de données ou pas connecté
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location } });
      return;
    }
    
    if (!event || !ticketType || !quantity) {
      navigate('/events');
    }
  }, [event, ticketType, quantity, isAuthenticated, navigate, location]);

  if (!event) {
    return null;
  }

  const handleBillingChange = (e) => {
    setBillingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Formatage automatique
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 5) return;
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) return;
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmitBilling = (e) => {
    e.preventDefault();
    
    // Validation
    if (!billingData.phone || !billingData.address) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setStep(2);
    window.scrollTo(0, 0);
  };

const handleSubmitPayment = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Validation carte
  const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
  if (cardNumberClean.length !== 16) {
    setError('Numéro de carte invalide');
    setLoading(false);
    return;
  }

  if (paymentData.cvv.length !== 3) {
    setError('CVV invalide');
    setLoading(false);
    return;
  }

  try {
    // Appel API Laravel pour créer la réservation
    const response = await api.post('/tickets/purchase', {
      event_id: event.id,
      ticket_type: ticketType.name,
      quantity: quantity,
      total_price: total,
      billing_data: billingData,
    });

    // Si succès, passer à l'étape 3
    setStep(3);
    setLoading(false);
    window.scrollTo(0, 0);
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur lors du paiement');
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {step !== 3 && (
          <button
            onClick={() => step === 1 ? navigate(-1) : setStep(1)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        )}

        {/* Progress Steps */}
        {step !== 3 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className={`font-semibold ${step >= 1 ? 'text-purple-600' : 'text-gray-600'}`}>
                  Informations
                </span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4">
                <div className={`h-full transition-all duration-500 ${step >= 2 ? 'bg-purple-600 w-full' : 'w-0'}`}></div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`font-semibold ${step >= 2 ? 'text-purple-600' : 'text-gray-600'}`}>
                  Paiement
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            
            {/* Step 1: Billing Info */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de facturation</h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmitBilling} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={billingData.fullName}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={billingData.email}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingData.phone}
                        onChange={handleBillingChange}
                        placeholder="+212 6XX XXX XXX"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ville *
                      </label>
                      <select
                        name="city"
                        value={billingData.city}
                        onChange={handleBillingChange}
                        required
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse complète *
                    </label>
                    <textarea
                      name="address"
                      value={billingData.address}
                      onChange={handleBillingChange}
                      rows="3"
                      required
                      placeholder="Numéro, rue, quartier..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
                  >
                    Continuer vers le paiement
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Paiement sécurisé</h2>
                    <p className="text-sm text-gray-600">Vos données sont protégées</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Numéro de carte *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom sur la carte *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      placeholder="JEAN DUPONT"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date d'expiration *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/AA"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800 flex items-start gap-2">
                      <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      Votre paiement est sécurisé. Nous ne stockons jamais vos informations bancaires.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Paiement en cours...' : `Payer ${total} MAD`}
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservation confirmée !</h2>
                <p className="text-gray-600 mb-8">
                  Votre réservation a été effectuée avec succès. Un email de confirmation vous a été envoyé.
                </p>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
                  <p className="text-sm text-purple-700 mb-2">Référence de réservation</p>
                  <p className="text-2xl font-bold text-purple-900">MTX-2025-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="flex-1 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition"
                  >
                    Voir mes réservations
                  </button>
                  <button
                    onClick={() => navigate('/events')}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                  >
                    Découvrir d'autres événements
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h3>

                {/* Event Info */}
                <div className="mb-6">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Casablanca, Maroc</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      <span>{ticketType.name} × {quantity}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{ticketType.price * quantity} MAD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frais de service</span>
                    <span className="font-semibold">5 MAD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-purple-600">{total} MAD</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-semibold">Paiement 100% sécurisé</span>
                  </div>
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

export default CheckoutPage;