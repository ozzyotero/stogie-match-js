import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Stogie Match" className="h-8" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/humidor" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Humidor
            </Link>
            <Link 
              to="/glossary" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Glossary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;