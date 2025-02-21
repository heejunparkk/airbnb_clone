export interface Accommodation {
  id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  rating: number;
  bedrooms: number;
  beds: number;
  baths: number;
  maxGuests: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccommodationsResponse {
  accommodations: Accommodation[];
}

export interface SearchBarProps {
  isScrolled: boolean;
}

export type TabType = 'location' | 'checkin' | 'checkout' | 'guest' | 'date' | null;

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  profileImage?: string;
  phoneNumber?: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  user: User;
}
