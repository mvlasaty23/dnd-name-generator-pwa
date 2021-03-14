import { LanguagePack, LanguageRule, Syllables } from '../model';
import { generateRandomName, randomizedIndex, selectNextSyllable } from './name-generator';

describe('Name Generator', () => {
  it('should generate a male name', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: ['ma'],
          infix: ['so'],
          suffix: ['la'],
        },
        female: {
          prefix: [],
          infix: [],
          suffix: [],
        },
      },
    };
    // When
    const generatedName = generateRandomName(3, languagePack, 'male');
    // Then
    expect(generatedName).toBeTruthy();
    expect(generatedName).toBe('Masola');
  });
  it('should generate a female name', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: ['ma'],
          suffix: ['so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(3, languagePack, 'female');
    // Then
    expect(generatedName).toBeTruthy();
    expect(generatedName).toBe('Lamaso');
  });
  it('should generate a name starting with an uppercase letter', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: ['ma'],
          suffix: ['so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(2, languagePack, 'female');
    // Then
    expect(generatedName.startsWith('L')).toBeTruthy();
  });
  it('should generate a two syllable name without an infix', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: [], // should not be used
          suffix: ['so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(2, languagePack, 'female');
    // Then
    expect(generatedName).not.toContain('to');
  });
  it('should generate a three syllable name with an infix', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: ['to'], // should be used
          suffix: ['so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(3, languagePack, 'female');
    // Then
    expect(generatedName).toContain('to');
  });
  it('should generate a four syllable name with two infix', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: ['to', 'to'], // should be used
          suffix: ['so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(4, languagePack, 'female');
    // Then
    expect(generatedName).toBe('Latotoso');
  });
  it('should generate a name using language rules', () => {
    // Given
    const mockRule = jest.fn((_: string, __: Syllables) => true);
    const languagePack: LanguagePack = {
      rules: [mockRule],
      syllables: {
        male: {
          prefix: [],
          infix: [],
          suffix: [],
        },
        female: {
          prefix: ['la'],
          infix: [],
          suffix: ['so'],
        },
      },
    };
    // When
    generateRandomName(2, languagePack, 'female');
    // Then
    expect(mockRule).toBeCalled();
  });
});
describe('Syllable Lexer', () => {
  it('should return the next syllable', () => {
    // Given
    const syllables = ['la', 'la'];
    const word = ['so'];
    const rules: LanguageRule[] = [];
    // When
    const nextSyllable = selectNextSyllable(syllables, word, rules);
    // Then
    expect(nextSyllable).toBe(syllables[0]);
  });
});
describe('Randomized Index', () => {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((upper) =>
    it(`should return a random integer within upper bound[0 - ${upper}]`, () =>
      expect(randomizedIndex(upper)).toBeLessThanOrEqual(upper)),
  );
});

