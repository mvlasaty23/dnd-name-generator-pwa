import { LanguagePack, LanguageRule } from '../model';

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
      selectNextSyllable(i === 0 && syllableCount > 2 ? language.infix : language.suffix, word, languagePack.rules),
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
