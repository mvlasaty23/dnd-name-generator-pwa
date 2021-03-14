import { LanguagePack, LanguageRule, SyllableRoot } from '../model';

export function generateRandomName(
  syllableCount: number,
  languagePack: LanguagePack,
  genderSelector: keyof LanguagePack['syllables'],
) {
  function firstUpper(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
  }

  const language = languagePack.syllables[genderSelector];
  const word = [language.prefix[randomizedIndex(language.prefix.length - 1)]];
  for (let i = 0; i < syllableCount - 1; i++) {
    // -1 because prefix already in place
    word.push(
      selectNextSyllable(
        i < syllableCount - 2 && syllableCount > 2 ? language.infix : language.suffix,
        word,
        languagePack.rules,
      ),
    );
  }
  return firstUpper(word.join(''));
}

export function selectNextSyllable(syllables: string[], word: string[], rules: LanguageRule[]) {
  let syllable = '';
  while (syllable === '') {
    const randomSyllable = syllables[randomizedIndex(syllables.length - 1)];
    if (evaluateRules(rules, word, randomSyllable) === -1) {
      syllable = randomSyllable;
    }
  }
  return syllable;
}

export function randomizedIndex(upper: number): number {
  return Math.floor(Math.random() * upper);
}

/**
 * Returns the index of the failed rule or -1
 */
export function evaluateRules(rules: LanguageRule[], word: string[], syllable: string) {
  return rules.findIndex((rule) => !rule(syllable, word));
}

/**
 * Returns all permutations of given syllables for a word
 */
export function permutationsOf(syllables: string[], word: string[], rules: LanguageRule[]): string[][] {
  return syllables.filter((syl) => evaluateRules(rules, word, syl) === -1).map((syl) => [...word, syl]);
}

// TODO: add syllableCount for words >3 syllables
export function allPermutationsOf(syllables: SyllableRoot, rules: LanguageRule[]): string[][] {
  return syllables.prefix
    .map((syl) => permutationsOf(syllables.infix, [syl], rules))
    .flatMap((perm) => perm.flatMap((el) => permutationsOf(syllables.suffix, el, rules)));
}
export function allPermutationsOf4(syllables: SyllableRoot, rules: LanguageRule[]): string[][] {
  return syllables.prefix
    .map((syl) => permutationsOf(syllables.infix, [syl], rules))
    .flatMap((perm) => perm.map((el) => permutationsOf(syllables.infix, el, rules)))
    .flatMap((perm) => perm.flatMap((el) => permutationsOf(syllables.suffix, el, rules)));
}
