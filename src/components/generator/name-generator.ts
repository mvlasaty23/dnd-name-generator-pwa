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
      selectNextSyllable(syllableCount > 2 && i === 0 ? language.infix : language.suffix, word, languagePack.rules),
    );
  }
  return firstUpper(word.join(''));
}

export function selectNextSyllable(syllables: string[], word: string[], rules: LanguageRule[]) {
  let syllable = '';
  while (syllable === '') {
    const randomSyllable = syllables[randomizedIndex(syllables.length - 1)];
    if (rules.find((rule) => !rule(randomSyllable, word)) === undefined) {
      syllable = randomSyllable;
    }
  }
  return syllable;
}

function randomizedIndex(upper: number): number {
  return Math.floor(Math.random() * upper + 1);
}
