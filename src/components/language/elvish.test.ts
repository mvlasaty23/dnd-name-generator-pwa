import { generateRandomName } from '../generator/name-generator';
import { LanguagePack } from '../model';
import elvish from './elvish';

describe('Elvish', () => {
  const languagePack = elvish;
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
});
