import {
  allPermutationsOf,
  allPermutationsOf4,
  evaluateRules,
  generateRandomName,
  permutationsOf,
  selectNextSyllable,
} from '../generator/name-generator';
import { Gender, LanguagePack, LanguageRule, WordPart } from '../model';
import elvish from './elvish';

describe('Elvish', () => {
  const languagePack = elvish;

  syllableCheck('prefix', 'infix', languagePack.syllables, languagePack.rules);
  syllableCheck('prefix', 'suffix', languagePack.syllables, languagePack.rules);
  syllableCheck('infix', 'infix', languagePack.syllables, languagePack.rules);
  syllableCheck('infix', 'suffix', languagePack.syllables, languagePack.rules);

  describe('Male', () => {
    it('should generate a name suffixed aran', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: ['cae'],
            infix: ['til'],
            suffix: ['aran'],
          },
          female: {
            prefix: [],
            infix: [],
            suffix: [],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'male');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed dir', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: ['cae'],
            infix: ['til'],
            suffix: ['dir'],
          },
          female: {
            prefix: [],
            infix: [],
            suffix: [],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'male');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed ed', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: ['cae'],
            infix: ['til'],
            suffix: ['ed'],
          },
          female: {
            prefix: [],
            infix: [],
            suffix: [],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'male');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed hil', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: ['cae'],
            infix: ['vyn'],
            suffix: ['hil'],
          },
          female: {
            prefix: [],
            infix: [],
            suffix: [],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'male');
      // Then
      expect(word).toBeTruthy();
    });
  });
  describe('Female', () => {
    it('should generate a name suffixed eth', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: [],
            infix: [],
            suffix: [],
          },
          female: {
            prefix: ['dae'],
            infix: ['hil'],
            suffix: ['eth'],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'female');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed wyn', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: [],
            infix: [],
            suffix: [],
          },
          female: {
            prefix: ['dae'],
            infix: ['hil'],
            suffix: ['wyn'],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'female');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed nith', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: [],
            infix: [],
            suffix: [],
          },
          female: {
            prefix: ['dae'],
            infix: ['hil'],
            suffix: ['nith'],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'female');
      // Then
      expect(word).toBeTruthy();
    });
    it('should generate a name suffixed ril', () => {
      // Given
      const pack: LanguagePack = {
        rules: elvish.rules,
        syllables: {
          male: {
            prefix: [],
            infix: [],
            suffix: [],
          },
          female: {
            prefix: ['dae'],
            infix: ['hil'],
            suffix: ['ril'],
          },
        },
      };
      // When
      const word = generateRandomName(3, pack, 'female');
      // Then
      expect(word).toBeTruthy();
    });
  });

  describe('Permutations', () => {
    it('should generate permutations', () => {
      // Given
      const prefix = ['a', 'a1', 'a2'];
      const infix = ['b', 'b1', 'b2'];
      const suffix = ['c', 'c1', 'c2'];
      // When
      const permutations = prefix
        .map((p) => permutationsOf(infix, [p], languagePack.rules))
        .flatMap((perm) => perm.flatMap((el) => permutationsOf(suffix, el, languagePack.rules)));
      // Then
      expect(permutations.length).toBe(3 ** 3);
    });
    it('should not define dead female infix', () => {
      // Given
      const {infix: infixes, suffix: suffixes} = languagePack.syllables.female;
      // When
      const permutations = allPermutationsOf(languagePack.syllables.female, languagePack.rules);
      const permutationsInfixes = permutations
        .map((perm) => perm[1])
        .filter((infix, index, self) => self.indexOf(infix) === index);
      const permutationsSuffixes = permutations
        .map((perm) => perm[2])
        .filter((suffix, index, self) => self.indexOf(suffix) === index);
      // Then
      expect(infixes.length === permutationsInfixes.length).toBeTruthy();
      expect(infixes.filter(infix => permutationsInfixes.indexOf(infix) === -1).length).toBe(0);
      expect(suffixes.length === permutationsSuffixes.length).toBeTruthy();
      expect(suffixes.filter(suffix => permutationsSuffixes.indexOf(suffix) === -1).length).toBe(0);
    });
    it('should not define dead male infix', () => {
      // Given
      const {infix: infixes, suffix: suffixes} = languagePack.syllables.male;
      // When
      const permutations = allPermutationsOf(languagePack.syllables.male, languagePack.rules);
      const permutationsInfixes = permutations
        .map((perm) => perm[1])
        .filter((infix, index, self) => self.indexOf(infix) === index);
      const permutationsSuffixes = permutations
        .map((perm) => perm[2])
        .filter((suffix, index, self) => self.indexOf(suffix) === index);
      // Then
      expect(infixes.length === permutationsInfixes.length).toBeTruthy();
      expect(infixes.filter(infix => permutationsInfixes.indexOf(infix) === -1).length).toBe(0);
      expect(suffixes.length === permutationsSuffixes.length).toBeTruthy();
      expect(suffixes.filter(suffix => permutationsSuffixes.indexOf(suffix) === -1).length).toBe(0);
    });
    it('should generate all female names with 3 and 4 syllables', () => {
      expect(allPermutationsOf(languagePack.syllables.female, languagePack.rules).length).toBeGreaterThanOrEqual(8600);
      expect(allPermutationsOf4(languagePack.syllables.female, languagePack.rules).length).toBeGreaterThanOrEqual(357000);
    });
    it('should generate all male names with 3 and 4 syllables', () => {
      expect(allPermutationsOf(languagePack.syllables.male, languagePack.rules).length).toBeGreaterThanOrEqual(8000);
      expect(allPermutationsOf4(languagePack.syllables.male, languagePack.rules).length).toBeGreaterThanOrEqual(345000);
    });
  });
});

function syllableCheck(first: WordPart, second: WordPart, syllables: LanguagePack['syllables'], rules: LanguageRule[]) {
  Object.keys(syllables).forEach((gender) => {
    syllables[gender as Gender][first].forEach((syllable) => {
      it(`should find ${second} for ${first} ${syllable}`, () => {
        // When
        const nextSyl = selectNextSyllable(syllables[gender as Gender][second], [syllable], rules);
        // Then
        expect(nextSyl).toBeTruthy();
      });
    });
  });
}
