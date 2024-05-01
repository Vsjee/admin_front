type t_c = { ip: string; date: number; version: string };

export interface Kid {
  _id: string;
  customer_id: string;
  name: string;
  age: number;
  years: number;
  gender: string;
  creation_date: number;
  modification_date: number;
  is_active: boolean;
  avatar: string;
  family_context: string[];
  personal_context: string[];
  socioemotional_context: string[];
  aspects: string[];
  personality: string[];
  t_c: t_c[];
}

export interface KidBooksInfo {
  total_books: number;
  french_stories: number;
  spanish_stories: number;
  portuguese_stories: number;
  empathy_included: number;
  compassion_included: number;
  gratitude_included: number;
  patience_included: number;
  confidence_included: number;
  adaptability_included: number;
  generosity_included: number;
  leadership_included: number;
  assertiveness_included: number;
}
