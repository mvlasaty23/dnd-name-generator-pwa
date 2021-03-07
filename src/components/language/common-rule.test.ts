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

interface TestCase {
  word: string[];
  nextSyllable: string;
  expected: boolean;
}
interface TestCases {
  title: string;
  testCases: TestCase[];
  rules: LanguageRule[];
}
describe('Common Language Rule', () => {
  const tests: TestCases[] = [
    {
      title: 'Distinct',
      testCases: [
        { word: ['asd'], nextSyllable: 'asd', expected: false },
        { word: ['daf', 'asd'], nextSyllable: 'asd', expected: false },
        { word: ['asd', 'daf'], nextSyllable: 'asd', expected: false },
        { word: ['la', 'asd', 'daf'], nextSyllable: 'asd', expected: false },
        { word: ['asd', 'daf'], nextSyllable: 'blah', expected: true },
      ],
      rules: [distinct],
    },
    {
      title: 'Not after',
      testCases: [
        { word: ['ad'], nextSyllable: 'da', expected: false },
        { word: ['at'], nextSyllable: 'da', expected: false },
        { word: ['ath'], nextSyllable: 'da', expected: false },
        { word: ['al'], nextSyllable: 'da', expected: true },
      ],
      rules: [notAfter('d', 'd'), notAfter('t', 'd'), notAfter('th', 'd')],
    },
    {
      title: 'Not Same After',
      testCases: [
        { word: ['da'], nextSyllable: 'al', expected: false },
        { word: ['de'], nextSyllable: 'el', expected: false },
        { word: ['di'], nextSyllable: 'il', expected: false },
        { word: ['do'], nextSyllable: 'ol', expected: false },
        { word: ['du'], nextSyllable: 'ul', expected: false },
        { word: ['asch'], nextSyllable: 'sche', expected: false },
        { word: ['ack'], nextSyllable: 'cke', expected: false },
        { word: ['ach'], nextSyllable: 'che', expected: false },
        { word: ['atz'], nextSyllable: 'tze', expected: false },
        { word: ['ath'], nextSyllable: 'the', expected: false },
        { word: ['ast'], nextSyllable: 'ste', expected: false },
        { word: ['ae'], nextSyllable: 'ste', expected: true },
      ],
      rules: [...notSameSubsequentVocal, ...notSameSubsequentComposite],
    },
    {
      title: 'Unique Substring',
      testCases: [
        { word: ['asy'], nextSyllable: 'by', expected: false },
        { word: ['as'], nextSyllable: 'by', expected: true },
      ],
      rules: [uniqueSubstring('y')],
    },
    {
      title: 'Not same starting',
      testCases: [
        { word: ['cy'], nextSyllable: 'ca', expected: false },
        { word: ['ad', 'sa'], nextSyllable: 'ca', expected: true },
      ],
      rules: [notSameStarting('c')],
    },
    {
      title: 'Not more than',
      testCases: [
        { word: ['ci', 'saii'], nextSyllable: 'ci', expected: false },
        { word: ['adi', 'sai'], nextSyllable: 'ci', expected: true },
      ],
      rules: [notMoreThan('i', 3)],
    },
    {
      title: 'Not more than except',
      testCases: [
        { word: ['ca', 'sama'], nextSyllable: 'ma', expected: false },
        { word: ['cae', 'sai'], nextSyllable: 'ma', expected: true },
      ],
      rules: [notMoreThanExcept('a', 3, 'ae')],
    },
  ];
  tests.forEach(({ title, testCases, rules }) =>
    describe(title, () => {
      testCases.forEach(({ word, nextSyllable, expected }) =>
        it(`should ${expected ? 'allow' : 'not allow'} syllable[${nextSyllable}] to be added to word[${word}]`, () =>
          expect(evaluateRules(rules, word, nextSyllable) === -1).toBe(expected)),
      );
    }),
  );
});

function evaluateRules(rules: LanguageRule[], word: string[], syllable: string) {
  return rules.findIndex((rule) => !rule(syllable, word));
}
