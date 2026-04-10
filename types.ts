export interface Video {
  id: string;
  title: string;
  duration: string;
  isFree?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | string;
  tags?: string[];
  icon?: string;
  image?: string;
  price?: string;
  videos?: Video[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
