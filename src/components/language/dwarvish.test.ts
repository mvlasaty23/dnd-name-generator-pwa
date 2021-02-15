import { LanguageRule } from '../model';
import dwarvish from './dwarvish';

const languagePack = dwarvish;
describe('Dwarvish', () => {
  describe('Rules', () => {
    // TODO: refactor out general rules to smaller verbose constants
    [
      { word: ['da'], nextSyllable: 'a' },
      { word: ['de'], nextSyllable: 'e' },
      { word: ['di'], nextSyllable: 'i' },
      { word: ['do'], nextSyllable: 'o' },
      { word: ['du'], nextSyllable: 'u' },
      { word: ['asch'], nextSyllable: 'sch' },
      { word: ['ack'], nextSyllable: 'ck' },
    ].forEach((testCase) =>
      it(`should not allow syllable[${testCase.nextSyllable}] to be added to word[${testCase.word}]`, () => {
        expect(languagePack.rules.find((rule) => !rule(testCase.nextSyllable, testCase.word))).not.toBeUndefined();
      }),
    );
    it('should not allow duplicat syllables', () => {
      expect(evaluateRules(languagePack.rules, ['asd'], 'asd')).not.toBe(-1);
    });
    it('should allow unique syllables', () => {
      expect(evaluateRules(languagePack.rules, ['asd', 'daf'], 'blah')).toBe(-1);
    });
  });
});
function evaluateRules(rules: LanguageRule[], word: string[], syllable: string) {
  return rules.findIndex((rule) => !rule(syllable, word));
}
