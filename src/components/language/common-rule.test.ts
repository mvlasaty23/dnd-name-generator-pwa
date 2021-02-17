import { LanguageRule } from '../model';
import { distinct, notSameSubsequentComposite, notSameSubsequentVocal } from './common-rule';

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
        expect(evaluateRules(rules, testCase.word, testCase.nextSyllable)).not.toBeUndefined();
      }),
    );
  });

  describe('Distinct', () => {
    const rules = [distinct];
    [
      { word: ['asd'], nextSyllable: 'asd' },
      { word: ['daf', 'asd'], nextSyllable: 'asd' },
      { word: ['asd', 'daf'], nextSyllable: 'asd' },
    ].forEach(({ word, nextSyllable }) =>
      it(`should not allow duplicat[${nextSyllable}] in word[${word}]`, () => {
        expect(evaluateRules(rules, word, nextSyllable)).not.toBeUndefined();
      }),
    );
    it('should allow unique syllables', () => {
      expect(evaluateRules(rules, ['asd', 'daf'], 'blah')).toBeUndefined();
    });
  });
});

function evaluateRules(rules: LanguageRule[], word: string[], syllable: string) {
  return rules.find((rule) => !rule(syllable, word));
}
