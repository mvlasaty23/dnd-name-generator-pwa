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

export interface SyllableRoot {
  prefix: string[];
  infix: string[];
  suffix: string[];
}

/**
 * Returns false on success, and true if the next syllable is not eligble for the given word
 */
export type LanguageRule = (nextSyllable: string, word: Syllables) => boolean;
export type Gender = 'male' | 'female';
export type WordPart = keyof SyllableRoot;

export interface LanguagePack {
  rules: LanguageRule[];
  syllables: {
    [k in Gender]: SyllableRoot;
  };
}
