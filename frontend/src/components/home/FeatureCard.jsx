import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, bgColor, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;