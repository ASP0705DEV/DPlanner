export type MemoryCategory =
  | 'all'
  | 'festive'
  | 'road-ride'
  | 'cafe'
  | 'nature'
  | 'cuddle'
  | 'fun'
  | 'special';

export interface LoveMemory {
  id: string;
  title: string;
  date: string;
  location: string;
  category: MemoryCategory;
  categoryLabel: string;
  photoUrl: string;
  doodleUrl?: string;
  caption: string;
  story: string;
  sonuNote?: string;
  vibeTag?: string;
  isUserAdded?: boolean;
  createdAt?: string;
}
