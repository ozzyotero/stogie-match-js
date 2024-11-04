export interface SearchCriteria {
  flavor: string;
  body: string;
  origin: string;
  occasion: string;
}

export interface Cigar {
  id?: string;
  name: string;
  description: string;
  flavor?: string;
  body?: string;
  origin?: string;
  occasion?: string;
  price?: string;
  maker?: string;
  makerUrl?: string;
  imageUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}