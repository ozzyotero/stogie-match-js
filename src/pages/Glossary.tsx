import React from 'react';
import { Book } from 'lucide-react';

const Glossary: React.FC = () => {
  const terms = {
    flavor: {
      earthy: 'Notes reminiscent of soil, leather, and natural elements',
      spicy: 'Peppery or warm sensations on the palate',
      sweet: 'Hints of caramel, vanilla, or cocoa',
      woody: 'Cedar, oak, or other wood-like flavors',
      nutty: 'Almond, peanut, or other nut-like tastes'
    },
    body: {
      mild: 'Light and gentle on the palate',
      medium: 'Balanced strength and flavor intensity',
      full: 'Bold, rich, and intense experience'
    },
    origin: {
      cuba: 'Known for their rich history and complex flavors',
      dominican: 'Famous for smooth, well-balanced cigars',
      nicaragua: 'Known for full-bodied, spicy profiles',
      honduras: 'Produces earthy, medium to full-bodied cigars'
    },
    occasion: {
      casual: 'Perfect for everyday enjoyment',
      celebration: 'Special cigars for memorable moments',
      special: 'Premium selections for important events',
      gift: 'Excellent choices for presenting to others'
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Book className="w-16 h-16 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cigar Glossary</h1>
        <p className="text-lg text-gray-600">
          Understanding cigar terminology and characteristics
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(terms).map(([category, items]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 capitalize">
              {category}
            </h2>
            <div className="grid gap-4">
              {Object.entries(items).map(([term, description]) => (
                <div key={term} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium text-amber-600 capitalize mb-1">
                    {term}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glossary;