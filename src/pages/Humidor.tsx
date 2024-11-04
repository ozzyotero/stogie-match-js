import React from 'react';
import { Package } from 'lucide-react';
import CigarCard from '../components/CigarCard';
import { getHumidor, removeFromHumidor } from '../utils/storage';
import toast from 'react-hot-toast';

function Humidor() {
  const [cigars, setCigars] = React.useState(getHumidor());

  const handleRemove = (cigar: Cigar) => {
    removeFromHumidor(cigar.id!);
    setCigars(getHumidor());
    toast.success('Removed from humidor');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Package className="w-16 h-16 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Your Humidor
        </h1>
        <p className="text-lg text-gray-600">
          Your saved favorite cigars
        </p>
      </div>

      {cigars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            Your humidor is empty. Start adding cigars from the recommendations!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cigars.map((cigar) => (
            <CigarCard
              key={cigar.id}
              cigar={cigar}
              onFavorite={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Humidor;