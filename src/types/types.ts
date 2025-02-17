export interface Accommodation {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  description: string;
}

export interface SearchBarProps {
  isScrolled: boolean;
}

export type TabType = 'location' | 'checkin' | 'checkout' | 'guest' | 'date' | null;
