import React from 'react';
import { Shield, Bell, CreditCard, DollarSign, Lock, Calendar } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Pourquoi choisir MyTiq ?</h2>
          <p className="text-gray-600">
            Une plateforme sécurisée et simple pour tous vos événements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Shield}
            title="Paiement sécurisé"
            description="Vos transactions sont protégées avec les dernières technologies de sécurité"
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <FeatureCard
            icon={Bell}
            title="Notifications instantanées"
            description="Recevez des alertes pour vos événements favoris et nouvelles sorties"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <FeatureCard
            icon={CreditCard}
            title="Billets numériques"
            description="Accédez à vos billets sur votre téléphone, partout et à tout moment"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <FeatureCard
            icon={DollarSign}
            title="Support 24/7"
            description="Notre équipe est disponible pour vous aider à tout moment"
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <FeatureCard
            icon={Lock}
            title="Remboursement garanti"
            description="En cas d'annulation, vous êtes remboursé intégralement"
            bgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
          <FeatureCard
            icon={Calendar}
            title="Calendrier de sorties"
            description="Ne manquez plus aucun événement avec notre système de rappels"
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;