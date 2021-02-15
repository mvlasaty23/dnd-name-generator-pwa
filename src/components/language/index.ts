import { Languages } from '../model';
import dwarvish from './dwarvish';
import elvish from './elvish';

const notImplementedLanguage = {
  rules: [],
  syllables: { male: { prefix: [], suffix: [], infix: [] }, female: { prefix: [], suffix: [], infix: [] } },
};

const languages: Languages = {
  dragonborn: notImplementedLanguage,
  dwarf: dwarvish,
  elf: elvish,
  gnome: notImplementedLanguage,
  hafling: notImplementedLanguage,
  halfElf: notImplementedLanguage,
  halfOrc: notImplementedLanguage,
  human: notImplementedLanguage,
  tiefling: notImplementedLanguage,
};
export default languages;
