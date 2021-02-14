import { LanguagePack, LanguageRule, Syllables } from '../model';
import { generateRandomName, selectNextSyllable } from './name-generator';

describe('Name Generator', () => {
  it('should generate a male name', () => {
    // Given
    const languagePack: LanguagePack = {
      rules: [],
      syllables: {
        male: {
          prefix: ['ma', 'ma'],
          infix: ['so', 'so'],
          suffix: ['la', 'la'],
        },
        female: {
          prefix: ['la'],
          infix: ['ma'],
          suffix: ['so'],
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
          prefix: ['ma', 'ma'],
          infix: ['so', 'so'],
          suffix: ['la', 'la'],
        },
        female: {
          prefix: ['la', 'la'],
          infix: ['ma', 'ma'],
          suffix: ['so', 'so'],
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
          prefix: ['la', 'la'],
          infix: ['ma'],
          suffix: ['so', 'so'],
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
          prefix: ['la', 'la'],
          infix: ['to', 'to'], // should not be used
          suffix: ['so', 'so'],
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
          prefix: ['la', 'la'],
          infix: ['to', 'to'], // should be used
          suffix: ['so', 'so'],
        },
      },
    };
    // When
    const generatedName = generateRandomName(3, languagePack, 'female');
    // Then
    expect(generatedName).toContain('to');
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
          prefix: ['la', 'la'],
          infix: [],
          suffix: ['so', 'so'],
        },
      },
    };
    // When
    generateRandomName(2, languagePack, 'female');
    // Then
    expect(mockRule).toBeCalled();
  });
});
// TODO: refactor out lexer and radomizedIndex for mocking?
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
