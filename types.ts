export interface Network {
  id: string;
  name: string;
  country: string;
  language: string;
  website: string;
  subscriptionPrice: number;
  foundedYear: number;
  founder: string;
  image: string;
}

export interface Serie {
  id: string;
  name: string;
  seasons: number;
  rating: number;
  year: number;
  description: string;
  networkId: string;
  minAge: number;
  isCompleted: boolean;
  language: string;
  genres: string[];
  cast: string[];
  image: string;
}
