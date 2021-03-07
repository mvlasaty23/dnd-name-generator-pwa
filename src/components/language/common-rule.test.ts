import { LanguageRule } from '../model';
import {
  distinct,
  notAfter,
  notMoreThan,
  notMoreThanExcept,
  notSameStarting,
  notSameSubsequentComposite,
  notSameSubsequentVocal,
  uniqueSubstring,
} from './common-rule';

describe('Common Language Rule', () => {
  describe('Not Same After', () => {
    const rules = [...notSameSubsequentVocal, ...notSameSubsequentComposite];
    [
      { word: ['da'], nextSyllable: 'al' },
      { word: ['de'], nextSyllable: 'el' },
      { word: ['di'], nextSyllable: 'il' },
      { word: ['do'], nextSyllable: 'ol' },
      { word: ['du'], nextSyllable: 'ul' },
      { word: ['asch'], nextSyllable: 'sche' },
      { word: ['ack'], nextSyllable: 'cke' },
      { word: ['ach'], nextSyllable: 'che' },
      { word: ['atz'], nextSyllable: 'tze' },
      { word: ['ath'], nextSyllable: 'the' },
      { word: ['ast'], nextSyllable: 'ste' },
    ].forEach((testCase) =>
      it(`should not allow syllable[${testCase.nextSyllable}] to be added to word[${testCase.word}]`, () => {
        expect(evaluateRules(rules, testCase.word, testCase.nextSyllable)).not.toBe(-1);
      }),
    );
  });

  describe('Not after', () => {
    const rules = [notAfter('d', 'd'), notAfter('t', 'd'), notAfter('th', 'd')];
    it('should not allow next syllable starting with d after a syllable ending with d, t or th', () => {
      // Given
      const word1 = ['ad'];
      const word2 = ['at'];
      const word3 = ['ath'];
      const word4 = ['al'];
      const nextSyllable = 'da';

      // When + Then
      expect(evaluateRules(rules, word1, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word2, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word3, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word4, nextSyllable)).toBe(-1);
    });
  });

  describe('Unique Substring', () => {
    const rules = [uniqueSubstring('y')];
    it('should not allow syllables containing the unique substring', () => {
      // Given
      const word1 = ['asy'];
      const word2 = ['as'];
      const nextSyllable = 'by';
      // When + Then
      expect(evaluateRules(rules, word1, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word2, nextSyllable)).toBe(-1);
    });
  });

  describe('Not same startin', () => {
    const rules = [notSameStarting('c')];
    it('should not allow subsequent syllables with the same start', () => {
      // Given
      const word1 = ['cy'];
      const word2 = ['ad', 'sa'];
      const nextSyllable = 'ca';
      // When + Then
      expect(evaluateRules(rules, word1, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word2, nextSyllable)).toBe(-1);
    });
  });

  describe('Not more than', () => {
    const rules = [notMoreThan('i', 3)];
    it('should not allow more occurences of the given substring', () => {
      // Given
      const word1 = ['ci', 'saii'];
      const word2 = ['adi', 'sai'];
      const nextSyllable = 'ci';
      // When + Then
      expect(evaluateRules(rules, word1, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word2, nextSyllable)).toBe(-1);
    });
  });

  describe('Not more than except', () => {
    const rules = [notMoreThanExcept('a', 3, 'ae')];
    it('should not allow more occurences of the given substring except for defined combination', () => {
      // Given
      const word1 = ['ca', 'sama'];
      const word2 = ['cae', 'sai'];
      const nextSyllable = 'ma';
      // When + Then
      expect(evaluateRules(rules, word1, nextSyllable)).not.toBe(-1);
      expect(evaluateRules(rules, word2, nextSyllable)).toBe(-1);
    });
  });

  describe('Distinct', () => {
    const rules = [distinct];
    [
      { word: ['asd'], nextSyllable: 'asd' },
      { word: ['daf', 'asd'], nextSyllable: 'asd' },
      { word: ['asd', 'daf'], nextSyllable: 'asd' },
    ].forEach(({ word, nextSyllable }) =>
      it(`should not allow duplicat[${nextSyllable}] in word[${word}]`, () => {
        expect(evaluateRules(rules, word, nextSyllable)).not.toBe(-1);
      }),
    );
    it('should allow unique syllables', () => {
      expect(evaluateRules(rules, ['asd', 'daf'], 'blah')).toBe(-1);
    });
  });
});

function evaluateRules(rules: LanguageRule[], word: string[], syllable: string) {
  return rules.findIndex((rule) => !rule(syllable, word));
}
