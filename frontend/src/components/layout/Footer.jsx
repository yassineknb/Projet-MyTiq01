import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-400">🎫 MyTiq</h3>
          <p className="text-gray-400 text-sm">
            La plateforme n°1 pour réserver vos événements au Maroc
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">À propos</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Qui sommes-nous</a></li>
            <li><a href="#" className="hover:text-white">Carrières</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Légal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">CGU</a></li>
            <li><a href="#" className="hover:text-white">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>© 2025 MyTiq. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;