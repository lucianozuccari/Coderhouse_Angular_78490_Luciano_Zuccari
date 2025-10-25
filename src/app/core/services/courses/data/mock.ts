
import { Course, CourseLevel, CourseRanks, CourseLanguage, CourseAuthority, CourseCategory } from '../model/Course';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'TIE Fighter Combat Tactics',
    description:
      'Entrenamiento avanzado en maniobras de combate espacial con cazas TIE. Los cadetes aprenderán formaciones de ataque, tácticas de evasión y disciplina bajo fuego enemigo.',
    category: CourseCategory.COMBAT_TACTICS,
    level: CourseLevel.ADVANCED,
    rankRequired: CourseRanks.CADET,
    language: CourseLanguage.BASIC,
    authority: CourseAuthority.REPUBLIC_ACADEMY
  },
  {
    id: 2,
    title: 'Command and Control Protocols',
    description:
      'Curso orientado a oficiales que buscan perfeccionar sus habilidades en liderazgo, gestión de flotas y coordinación táctica dentro de la jerarquía imperial.',
    category: CourseCategory.GALACTIC_POLITICS,
    level: CourseLevel.INTERMEDIATE,
    rankRequired: CourseRanks.OFFICER,
    language: CourseLanguage.BASIC,
    authority: CourseAuthority.JEDI_COUNCIL,
  },
  {
    id: 3,
    title: 'Dark Side Fundamentals',
    description:
      'Introducción a los principios del Lado Oscuro de la Fuerza. Los aprendices explorarán el control de la ira, el miedo y la pasión como fuentes de poder, bajo la guía de un Lord Sith.',
    category: CourseCategory.SITH_ARTS,
    level: CourseLevel.BEGINNER,
    rankRequired: CourseRanks.SITH_LORD,
    language: CourseLanguage.HUTTESE,
    authority: CourseAuthority.SITH_ORDER,
  },
  {
    id: 4,
    title: 'Imperial Systems Engineering',
    description:
      'Formación técnica en diseño y mantenimiento de sistemas críticos del Imperio. Incluye protocolos de ciberseguridad, control energético y operación de estaciones orbitales.',
    category: CourseCategory.STARSHIP_ENGINEERING,
    level: CourseLevel.ADVANCED,
    rankRequired: CourseRanks.SUBOFFICER,
    language: CourseLanguage.BASIC,
    authority: CourseAuthority.REPUBLIC_ACADEMY
  },
  {
    id: 5,
    title: 'Galactic Governance and Strategy',
    description:
      'Programa destinado a altos rangos del Imperio. Analiza la estructura política galáctica, estrategias de control sectorial y los principios de orden y autoridad del Nuevo Régimen.',
    category: CourseCategory.GALACTIC_POLITICS,
    level: CourseLevel.INTERMEDIATE,
    rankRequired: CourseRanks.MOFF,
    language: CourseLanguage.BASIC,
    authority: CourseAuthority.IMPERIAL_ACADEMY
  },
];
