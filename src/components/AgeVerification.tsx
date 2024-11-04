import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  onVerify: () => void;
}

function AgeVerification({ onVerify }: Props) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-amber-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Age Verification Required</h2>
        
        <p className="text-gray-600 mb-8 text-center">
          You must be 21 years or older to access StogieMatch. 
          By clicking "I'm 21 or Older", you confirm that you meet the legal age requirement.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onVerify}
            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            I'm 21 or Older
          </button>
          
          <button
            onClick={() => window.location.href = 'https://www.google.com'}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Exit Site
          </button>
        </div>
      </div>
    </div>
  );
}