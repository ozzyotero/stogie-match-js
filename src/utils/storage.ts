import { Cigar } from '../types';

const HUMIDOR_KEY = 'stogiematch_humidor';

export const getHumidor = (): Cigar[] => {
  const stored = localStorage.getItem(HUMIDOR_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToHumidor = (cigar: Cigar) => {
  const humidor = getHumidor();
  if (!humidor.find(c => c.id === cigar.id)) {
    humidor.push(cigar);
    localStorage.setItem(HUMIDOR_KEY, JSON.stringify(humidor));
  }
};

export const removeFromHumidor = (cigarId: string) => {
  const humidor = getHumidor();
  const updated = humidor.filter(c => c.id !== cigarId);
  localStorage.setItem(HUMIDOR_KEY, JSON.stringify(updated));
};