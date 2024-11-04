import axios from 'axios';
import { SearchCriteria, Cigar } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const searchCigars = async (criteria: SearchCriteria): Promise<Cigar[]> => {
  const prompt = `Recommend 5 cigars based on these preferences:
    Flavor: ${criteria.flavor}
    Body: ${criteria.body}
    Origin: ${criteria.origin}
    Occasion: ${criteria.occasion}
    
    For each cigar, provide:
    - Name
    - Description
    - Price range
    - Maker
    - Website (if available)`;

  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a cigar expert providing detailed recommendations." },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Parse OpenAI response and format as Cigar objects
    // This is a simplified example - you'll need to parse the actual response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const searchByName = async (name: string): Promise<Cigar[]> => {
  const prompt = `Provide detailed information about the cigar named "${name}" and suggest 4 similar cigars.
    For each cigar, include:
    - Name
    - Description
    - Price range
    - Maker
    - Website (if available)`;

  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a cigar expert providing detailed information and recommendations." },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Parse OpenAI response and format as Cigar objects
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error searching by name:', error);
    throw error;
  }
};