export type Vocals = 'a' | 'e' | 'i' | 'o' | 'u';
export type CompositeSyllable = 'ck' | 'ch' | 'sch' | 'tz' | 'th' | 'st';

export function notSameAfter<T extends string = Vocals | CompositeSyllable>(vocal: T) {
  return (syllable: string, word: string[]) => !(syllable.startsWith(vocal) && word[word.length - 1].endsWith(vocal));
}
function distinctSyllables() {
  return (syllable: string, word: string[]) => word.find((el) => el === syllable) === undefined;
}

export const notSameSubsequentVocal = [
  notSameAfter('a'),
  notSameAfter('e'),
  notSameAfter('i'),
  notSameAfter('o'),
  notSameAfter('u'),
];
export const notSameSubsequentComposite = [
  notSameAfter('ck'),
  notSameAfter('ch'),
  notSameAfter('sch'),
  notSameAfter('tz'),
  notSameAfter('th'),
  notSameAfter('st'),
];
export const distinct = distinctSyllables();
