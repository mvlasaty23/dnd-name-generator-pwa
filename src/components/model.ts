export type Syllables = string[];

export const races = {
  dragonborn: 'Dragonborn',
  dwarf: 'Dwarf',
  elf: 'Elf',
  gnome: 'Gnome',
  halfElf: 'Half-Elf',
  hafling: 'Halfling',
  halfOrc: 'Half-Orc',
  human: 'Human',
  tiefling: 'Tiefling',
};

export const raceToLanguage: { [k in keyof typeof races]: string } = {
  dragonborn: 'Draconic',
  dwarf: 'Dwarvish',
  elf: 'Elvish',
  gnome: 'Gnomish',
  halfElf: 'Evlish',
  hafling: 'Halfling',
  halfOrc: 'Orc',
  human: 'Common',
  tiefling: 'Abyssal', // abyssal or infernal?
};

export type Languages = {
  [k in keyof typeof races]: LanguagePack;
};

interface SyllableRoot {
  prefix: string[];
  infix: string[];
  suffix: string[];
}

export type LanguageRule = (nextSyllable: string, word: Syllables) => boolean;

export interface LanguagePack {
  rules: LanguageRule[];
  syllables: {
    male: SyllableRoot;
    female: SyllableRoot;
  };
}
