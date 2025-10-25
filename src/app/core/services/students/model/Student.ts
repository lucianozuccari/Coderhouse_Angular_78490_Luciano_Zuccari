export interface Student {
  id: number;
  name: string;
  birthdate: Date;
  species: string;
  specialization: StudentSpecialization;
  rank: StudentRanks;
}

export enum StudentRanks {
  CADET = 'Cadet',
  SUBOFFICER = 'Subofficer',
  OFFICER = 'Officer',
  COMMANDER = 'Commander',
  MOFF = 'Moff',
  SITH_LORD = 'Sith Lord',
}

export enum StudentSpecies {
  HUMAN = 'Human',
  TWI_LEK = "Twi'lek",
  CHISS = 'Chiss',
  ZABRAK = 'Zabrak',
  RODIAN = 'Rodian',
  TRANDOSHAN = 'Trandoshan',
  MON_CALAMARI = 'Mon Calamari',
  WOOKIEE = 'Wookiee',
  BOTHAN = 'Bothan',
  DUROS = 'Duros',
  TOGRUTA = 'Togruta',
  NAUTOLAN = 'Nautolan',
  MIRIALAN = 'Mirialan',
  DATHOMIRIAN = 'Dathomirian',
  GEONOSIAN = 'Geonosian',
  CYBORG = 'Cyborg',
  DROID = 'Droid',
  KALEESH = 'Kaleesh'
}

export enum StudentSpecialization {
  COMBAT_PILOT = 'Combat Pilot',
  DIPLOMACY = 'Diplomacy & Relations',
  LOGISTICS = 'Logistics & Supply',
  INFANTRY = 'Infantry Operations',
  AT_PILOT = 'AT Walker Pilot',
  COMMAND_CONTROL = 'Command & Control',
  PROVISIONS = 'Provisions & Resources',
  ADMINISTRATION = 'Imperial Administration',
  INTELLIGENCE = 'Intelligence & Espionage',
  NAVAL_OPERATIONS = 'Naval Operations',
  ENGINEERING = 'Military Engineering',
  MEDICAL_CORPS = 'Medical Corps',
  COMMUNICATIONS = 'Communications & Signals',
  SPECIAL_FORCES = 'Special Forces',
  ARTILLERY = 'Artillery & Heavy Weapons',
}

export const studentColumns: string[] = [
  'name',
  'birthdate',
  'species',
  'specialization',
  'rank',
  'actions'
];
