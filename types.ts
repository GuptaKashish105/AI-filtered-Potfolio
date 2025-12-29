
export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  techStack: string[];
}

export interface Project {
  title: string;
  period: string;
  role: string;
  highlights: string[];
  about: string;
  techStack: string[];
  image: string;
}

// Fix: Added missing 'url' property to support external links for certificates in data and UI components
export interface Certificate {
  name: string;
  issuer: string;
  url: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpa: string;
}