export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  content: string;
  category: "mindset" | "habits" | "discipline" | "productivity" | "general";
  date: string;
  location?: string;
  verified?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BookDetail {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  lessons: string[];
  description: string;
  result: string;
  excerpts: {
    chapter: string;
    content: string;
  }[];
}

export interface Bonus {
  id: string;
  number: string;
  title: string;
  tagline: string;
  value: string;
  description: string;
  bullets: string[];
  impactLabel: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export interface DayChallenge {
  day: number;
  title: string;
  task: string;
  category: "mentalidad" | "habito" | "disciplina";
}
