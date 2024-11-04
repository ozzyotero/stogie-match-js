import React, { useState } from 'react';
import { SearchCriteria } from '../types';

interface CigarFormProps {
  onSubmit: (criteria: SearchCriteria) => void;
  isLoading: boolean;
}

const CigarForm: React.FC<CigarFormProps> = ({ onSubmit, isLoading }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    flavor: '',
    body: '',
    origin: '',
    occasion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(criteria);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCriteria(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="flavor" className="block text-sm font-medium text-gray-700 mb-1">
            Flavor Profile
          </label>
          <select
            id="flavor"
            name="flavor"
            value={criteria.flavor}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="">Select Flavor</option>
            <option value="earthy">Earthy</option>
            <option value="spicy">Spicy</option>
            <option value="sweet">Sweet</option>
            <option value="woody">Woody</option>
            <option value="nutty">Nutty</option>
          </select>
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <select
            id="body"
            name="body"
            value={criteria.body}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="">Select Body</option>
            <option value="mild">Mild</option>
            <option value="medium">Medium</option>
            <option value="full">Full</option>
          </select>
        </div>

        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
            Origin
          </label>
          <select
            id="origin"
            name="origin"
            value={criteria.origin}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="">Select Origin</option>
            <option value="cuba">Cuba</option>
            <option value="dominican">Dominican Republic</option>
            <option value="nicaragua">Nicaragua</option>
            <option value="honduras">Honduras</option>
          </select>
        </div>

        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={criteria.occasion}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="">Select Occasion</option>
            <option value="casual">Casual</option>
            <option value="celebration">Celebration</option>
            <option value="special">Special Event</option>
            <option value="gift">Gift</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Finding Matches...' : 'Find Matches'}
      </button>
    </form>
  );
};

export default CigarForm;