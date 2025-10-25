export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  level?: CourseLevel;
  rankRequired?: Ranks;
  language?: string;
  authority?: string;
}

export enum Ranks {
  CADET = 'Cadet',
  SUBOFFICER = 'Subofficer',
  OFFICER = 'Officer',
  COMMANDER = 'Commander',
  MOFF = 'Moff',
  SITH_LORD = 'Sith Lord',
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export const courseColumns: string[] = [
  'title',
  'description',
  'category',
  'level',
  'rankRequired',
  'language',
  'authority',
  'actions'
];
