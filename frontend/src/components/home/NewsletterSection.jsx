import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewsletterSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Restez informés</h2>
        <p className="text-xl mb-8 text-purple-100">
          Inscrivez-vous à notre newsletter pour recevoir les meilleures offres
        </p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800"
          />
          <button 
            onClick={() => navigate('/newsletter')}
            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            S'inscrire
          </button>
        </div>
        <p className="text-sm text-purple-200 mt-4">
          ou{' '}
          <button 
            onClick={() => navigate('/newsletter')}
            className="underline hover:text-white transition"
          >
            en savoir plus sur notre newsletter
          </button>
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;