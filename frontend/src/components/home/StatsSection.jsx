import React from 'react';

const StatsSection = () => {
  return (
    <div className="bg-white py-16 px-6 border-b">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold text-purple-600 mb-2">300+</div>
          <div className="text-gray-600 text-sm">Événements</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-600 mb-2">100K+</div>
          <div className="text-gray-600 text-sm">Utilisateurs</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
          <div className="text-gray-600 text-sm">Organisateurs</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
          <div className="text-gray-600 text-sm">Satisfaction</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;