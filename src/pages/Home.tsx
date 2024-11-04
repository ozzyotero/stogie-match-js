import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CigarForm from '../components/CigarForm';
import CigarCard from '../components/CigarCard';
import CigarNameSearch from '../components/CigarNameSearch';
import { Cigar, SearchCriteria } from '../types';
import { addToHumidor } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Cigar[]>([]);

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/search/preferences`, criteria);
      setRecommendations(response.data.results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to fetch recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameSearch = async (name: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/search/name`, { name });
      setRecommendations(response.data.results);
    } catch (error) {
      console.error('Name search error:', error);
      toast.error('Failed to search by name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = (cigar: Cigar) => {
    addToHumidor(cigar);
    toast.success('Added to humidor');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Cigar Match
        </h1>
        <p className="text-lg text-gray-600">
          Search by name or tell us your preferences to find the perfect cigars for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Search by Name
          </h2>
          <CigarNameSearch onSearch={handleNameSearch} isLoading={isLoading} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Search by Preferences
          </h2>
          <CigarForm onSubmit={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recommended Cigars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((cigar, index) => (
              <CigarCard
                key={cigar.id || index}
                cigar={cigar}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;