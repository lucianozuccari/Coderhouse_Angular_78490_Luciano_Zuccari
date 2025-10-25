export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  level?: CourseLevel;
  rankRequired?: CourseRanks;
  language?: string;
  authority?: string;
}

export enum CourseRanks {
  CADET = 'Cadet',
  SUBOFFICER = 'Subofficer',
  OFFICER = 'Officer',
  COMMANDER = 'Commander',
  MOFF = 'Moff',
  SITH_LORD = 'Sith Lord',
}

export enum CourseLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum CourseCategory {
  JEDI_TRAINING = 'Jedi Training',
  SITH_ARTS = 'Sith Arts',
  GALACTIC_POLITICS = 'Galactic Politics',
  STARSHIP_ENGINEERING = 'Starship Engineering',
  ALIEN_LANGUAGES = 'Alien Languages',
  GALACTIC_HISTORY = 'Galactic History',
  FORCE_STUDIES = 'Force Studies',
  COMBAT_TACTICS = 'Combat Tactics',
}

export enum CourseLanguage {
  HUTTESE = 'Huttese',
  SHYRIIWOOK = 'Shyriiwook',
  DROID = 'Droid',
  MANDO = 'Mando',
  BASIC = 'Basic',
}

export enum CourseAuthority {
  JEDI_COUNCIL = 'Jedi Council',
  SITH_ORDER = 'Sith Order',
  REPUBLIC_ACADEMY = 'Republic Academy',
  IMPERIAL_ACADEMY = 'Imperial Academy',
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
