import { LanguageRule, Syllables } from '../model';

export type Vocals = 'a' | 'e' | 'i' | 'o' | 'u';
export type CompositeSyllable = 'ck' | 'ch' | 'sch' | 'tz' | 'th' | 'st';

/**
 * Ensures distinct syllables per name
 */
function distinctSyllables(): LanguageRule {
  return function distinctSyllables(syllable: string, word: Syllables, syllableCount: number) {
    return word.find((el) => el === syllable) === undefined;
  };
}
/**
 * Ensures following syllables dont end/begin with the defined substrings
 * @param ending Tail substring of the last syllable
 * @param nextSub Head substring of the next syllable
 */
export function notAfter(ending: string, nextSub: string): LanguageRule {
  return function notAfter(syllable: string, word: Syllables, syllableCount: number) {
    return !(syllable.startsWith(nextSub) && word[word.length - 1].endsWith(ending));
  };
}
/**
 * Ensures following syllables dont end/begin with the same defnied substring
 * @param vocal Substring head and tail of the last syllables
 */
export function notSameAfter<T extends string = Vocals | CompositeSyllable>(vocal: T): LanguageRule {
  return notAfter(vocal, vocal);
}
/**
 * Ensures uniquness of a given substring within a name
 * @param substring Unique substring per name
 */
export function uniqueSubstring(substring: string): LanguageRule {
  return function uniqueSubstring(syllable: string, word: Syllables, syllableCount: number) {
    return !(syllable.includes(substring) && word.findIndex((w) => w.includes(substring)) > -1);
  };
}
/**
 * Ensures following syllables dont start with the same substring
 * @param substring Syllable start
 */
export function notSameStarting(substring: string): LanguageRule {
  return function notSameStarting(syllable: string, word: Syllables, syllableCount: number) {
    return !(syllable.startsWith(substring) && word[word.length - 1].startsWith(substring));
  };
}
/**
 * Ensures a max occurences of the given substring in the name
 * @param substring
 * @param count
 */
export function notMoreThan(substring: string, count: number): LanguageRule {
  return function notMoreThan(syllable: string, word: Syllables, syllableCount: number) {
    return occurences(syllable, substring) + allOccurences(word, substring) <= count;
  };
}
/**
 * Ensures a max occurences of the given substring in the name except for given combination
 * @param substring
 * @param count
 * @param except
 */
export function notMoreThanExcept(substring: string, count: number, except: string): LanguageRule {
  return function notMoreThanExcept(syllable: string, word: Syllables, syllableCount: number) {
    return (
      Math.abs(occurences(syllable, substring) - occurences(syllable, except)) +
        Math.abs(allOccurences(word, substring) - allOccurences(word, except)) <=
      count
    );
  };
}

export function infixNotFollowingOn(lastSubstr: string, substring: string): LanguageRule {
  return function infixNotFollowingOn(nextSyllable: string, word: Syllables, syllableCount: number) {
    if (syllableCount > 2 && word.length < syllableCount - 1) {
      return !(word[0].includes(lastSubstr) && nextSyllable.includes(substring));
    }
    return true;
  };
}

function allOccurences(word: Syllables, substring: string) {
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
