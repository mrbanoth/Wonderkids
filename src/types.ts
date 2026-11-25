export type PageId =
  | 'home'
  | 'shop'
  | 'quiz'
  | 'activities'
  | 'games'
  | 'about'
  | 'blog'
  | 'contact';

export interface ShopProduct {
  id: string;
  title: string;
  category: 'STEM Kits' | 'Art & Craft' | 'Workbooks' | 'Wooden Toys';
  ageRange: '3-5 yrs' | '6-8 yrs' | '9-12 yrs';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  accentColor: 'lavender' | 'purple' | 'yellow';
  shortDescription: string;
  fullDescription: string;
  skills: string[];
  whatsIncluded: string[];
  inStock: boolean;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  subject: string;
  ageRange: string;
  durationMinutes: number;
  accent: 'lavender' | 'purple' | 'yellow';
  description: string;
  questions: QuizQuestion[];
}

export interface CreativeActivity {
  id: string;
  title: string;
  category: 'Science' | 'Origami & Paper' | 'Painting' | 'Nature Craft';
  ageRange: string;
  duration: string;
  difficulty: 'Easy' | 'Medium';
  image: string;
  accent: 'lavender' | 'purple' | 'yellow';
  summary: string;
  materials: string[];
  steps: string[];
  learningTip: string;
}

export interface Educator {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  image: string;
  backdropVariant: 'yellow-circle' | 'lavender-squircle' | 'purple-circle' | 'mint-blob';
  bio: string;
  favoriteActivity: string;
  education: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Play & Learning' | 'Creative Parenting' | 'STEM & Curiosity' | 'Reading Habits';
  publishedDate: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  parentName: string;
  role: string;
  location: string;
  quote: string;
  outcome: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FamilyProfile {
  parentName: string;
  email: string;
  childName: string;
  childAge: number;
  quizzesCompleted: number;
  activitiesFinished: number;
  gamesPlayed: number;
}
