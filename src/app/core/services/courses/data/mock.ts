import { Course, CourseLevel, Ranks } from '../model/Course';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'TIE Fighter Combat Tactics',
    description:
      'Entrenamiento avanzado en maniobras de combate espacial con cazas TIE. Los cadetes aprenderán formaciones de ataque, tácticas de evasión y disciplina bajo fuego enemigo.',
    category: 'Imperial Navy Academy',
    level: CourseLevel.ADVANCED,
    rankRequired: Ranks.CADET,
    language: 'Galactic Basic',
    authority: 'Imperial Starfighter Command',
  },
  {
    id: 2,
    title: 'Command and Control Protocols',
    description:
      'Curso orientado a oficiales que buscan perfeccionar sus habilidades en liderazgo, gestión de flotas y coordinación táctica dentro de la jerarquía imperial.',
    category: 'Command Division',
    level: CourseLevel.INTERMEDIATE,
    rankRequired: Ranks.OFFICER,
    language: 'Galactic Basic',
    authority: 'Imperial High Command',
  },
  {
    id: 3,
    title: 'Dark Side Fundamentals',
    description:
      'Introducción a los principios del Lado Oscuro de la Fuerza. Los aprendices explorarán el control de la ira, el miedo y la pasión como fuentes de poder, bajo la guía de un Lord Sith.',
    category: 'Sith Doctrine',
    level: CourseLevel.BEGINNER,
    rankRequired: Ranks.SITH_LORD,
    language: 'Ancient Sith',
    authority: 'Sith Order Council',
  },
  {
    id: 4,
    title: 'Imperial Systems Engineering',
    description:
      'Formación técnica en diseño y mantenimiento de sistemas críticos del Imperio. Incluye protocolos de ciberseguridad, control energético y operación de estaciones orbitales.',
    category: 'Engineering Corps',
    level: CourseLevel.ADVANCED,
    rankRequired: Ranks.SUBOFFICER,
    language: 'Galactic Basic',
    authority: 'Imperial Department of Science and Technology',
  },
  {
    id: 5,
    title: 'Galactic Governance and Strategy',
    description:
      'Programa destinado a altos rangos del Imperio. Analiza la estructura política galáctica, estrategias de control sectorial y los principios de orden y autoridad del Nuevo Régimen.',
    category: 'Imperial Administration',
    level: CourseLevel.INTERMEDIATE,
    rankRequired: Ranks.MOFF,
    language: 'Galactic Basic',
    authority: 'Imperial Ruling Council',
  },
];
