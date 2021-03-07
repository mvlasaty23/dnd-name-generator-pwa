export type Vocals = 'a' | 'e' | 'i' | 'o' | 'u';
export type CompositeSyllable = 'ck' | 'ch' | 'sch' | 'tz' | 'th' | 'st';

function distinctSyllables() {
  return (syllable: string, word: string[]) => word.find((el) => el === syllable) === undefined;
}
export function notAfter(ending: string, nextSub: string) {
  return (syllable: string, word: string[]) =>
    !(syllable.startsWith(nextSub) && word[word.length - 1].endsWith(ending));
}
export function notSameAfter<T extends string = Vocals | CompositeSyllable>(vocal: T) {
  return notAfter(vocal, vocal);
}
export function uniqueSubstring(substring: string) {
  return (syllable: string, word: string[]) =>
    !(syllable.includes(substring) && word.findIndex((w) => w.includes(substring)) > -1);
}
export function notSameStarting(substring: string) {
  return (syllable: string, word: string[]) =>
    !(syllable.startsWith(substring) && word[word.length - 1].startsWith(substring));
}
export function notMoreThan(substring: string, count: number) {
  return (syllable: string, word: string[]) =>
    occurences(syllable, substring) + allOccurences(word, substring) <= count;
}
export function notMoreThanExcept(substring: string, count: number, except: string) {
  return (syllable: string, word: string[]) =>
    Math.abs(occurences(syllable, substring) - occurences(syllable, except)) +
      Math.abs(allOccurences(word, substring) - allOccurences(word, except)) <=
    count;
}
function allOccurences(word: string[], substring: string) {
  return word.map((w) => occurences(w, substring)).reduce((prev, next) => prev + next, 0);
}
function occurences(syllable: string, substring: string) {
  return syllable.split(substring).length - 1;
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
