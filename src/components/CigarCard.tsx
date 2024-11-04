import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Cigar } from '../types';
import { getHumidor } from '../utils/storage';

interface CigarCardProps {
  cigar: Cigar;
  onFavorite: (cigar: Cigar) => void;
}

const CigarCard: React.FC<CigarCardProps> = ({ cigar, onFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const humidor = getHumidor();
    setIsFavorite(humidor.some(c => c.id === cigar.id));
  }, [cigar.id]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(cigar);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {cigar.imageUrl && (
        <img
          src={cigar.imageUrl}
          alt={cigar.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{cigar.name}</h3>
          <button
            onClick={handleFavorite}
            className={`transition-colors ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">{cigar.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Origin:</span>
            <span className="text-gray-900">{cigar.origin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Body:</span>
            <span className="text-gray-900">{cigar.body}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Flavor:</span>
            <span className="text-gray-900">{cigar.flavor}</span>
          </div>
          {cigar.price && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price:</span>
              <span className="text-gray-900">{cigar.price}</span>
            </div>
          )}
        </div>
        {cigar.maker && (
          <div className="mt-4 text-sm">
            <a
              href={cigar.makerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 transition-colors"
            >
              View at {cigar.maker}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CigarCard;