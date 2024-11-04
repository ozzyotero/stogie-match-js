export interface Cigar {
  id?: number;
  cigar: string;
  description: string;
  flavor?: string;
  body?: string;
  origin?: string;
  occasion?: string;
  price?: string;
  maker?: string;
  maker_url?: string;
}

export interface SearchCriteria {
  flavor: string;
  body: string;
  origin: string;
  occasion: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}