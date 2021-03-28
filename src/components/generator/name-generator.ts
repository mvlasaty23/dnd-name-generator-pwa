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
        syllableCount,
      ),
    );
  }
  return firstUpper(word.join(''));
}

export function selectNextSyllable(syllables: string[], word: string[], rules: LanguageRule[], syllableCount: number) {
  let syllable = '';
  while (syllable === '') {
    const randomSyllable = syllables[randomizedIndex(syllables.length - 1)];
    if (evaluateRules(rules, word, randomSyllable, syllableCount) === -1) {
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
export function evaluateRules(rules: LanguageRule[], word: string[], syllable: string, syllableCount: number) {
  return rules.findIndex((rule) => !rule(syllable, word, syllableCount));
}

/**
 * Returns all permutations of given syllables for a word
 */
export function permutationsOf(
  syllables: string[],
  word: string[],
  rules: LanguageRule[],
  syllableCount: number,
): string[][] {
  return syllables.filter((syl) => evaluateRules(rules, word, syl, syllableCount) === -1).map((syl) => [...word, syl]);
}

// TODO: add syllableCount for words >3 syllables
export function allPermutationsOf(syllables: SyllableRoot, rules: LanguageRule[]): string[][] {
  return syllables.prefix
    .map((syl) => permutationsOf(syllables.infix, [syl], rules, 2))
    .flatMap((perm) => perm.flatMap((el) => permutationsOf(syllables.suffix, el, rules, 3)));
}
export function allPermutationsOf4(syllables: SyllableRoot, rules: LanguageRule[]): string[][] {
  return syllables.prefix
    .map((syl) => permutationsOf(syllables.infix, [syl], rules, 2))
    .flatMap((perm) => perm.map((el) => permutationsOf(syllables.infix, el, rules, 3)))
    .flatMap((perm) => perm.flatMap((el) => permutationsOf(syllables.suffix, el, rules, 4)));
}

interface NonPermutations {
  word: string[];
  syllable: string;
  rule: string;
}
function deniedRuleIndezes(rules: LanguageRule[], word: string[], syllable: string, syllableCount: number) {
  return rules.map((rule, index) => (!rule(syllable, word, syllableCount) ? index : -1)).filter((idx) => idx > -1);
}
export function nonPermutationsOf(syllables: string[], word: string[], rules: LanguageRule[], syllableCount: number) {
  return syllables
    .map((syl) => ({
      word,
      syllable: syl,
      ruleIndezes: deniedRuleIndezes(rules, word, syl, syllableCount),
    }))
    .filter((nonPerms) => nonPerms.ruleIndezes.length > 0)
    .map(({ word, syllable, ruleIndezes }) => {
      return {
        word,
        syllable,
        rule: ruleIndezes.map((ruleIndex) => rules[ruleIndex].name).join(', '),
      };
    });
}
export function allNonPermutationsOf(syllables: SyllableRoot, rules: LanguageRule[]): NonPermutations[][] {
  return syllables.prefix.map((syl) => nonPermutationsOf(syllables.infix, [syl], rules, 2));
}
export function allNonPermutationsOf3(syllables: SyllableRoot, rules: LanguageRule[]): NonPermutations[] {
  const allNonPermsPrefixToInfix = allNonPermutationsOf(syllables, rules).flatMap((el) => el);
  return [
    ...allNonPermsPrefixToInfix,
    ...allNonPermutationsOf(syllables, rules).flatMap((perm) =>
      perm.flatMap((el) => nonPermutationsOf(syllables.suffix, [...el.word, el.syllable], rules, 3)),
    ),
  ];
}
