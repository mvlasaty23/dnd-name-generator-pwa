import { evaluateRules } from '../generator/name-generator';
import { LanguageRule } from '../model';
import {
  distinct,
  infixNotFollowingOn,
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
  syllableCount: number;
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
        { word: ['asd'], nextSyllable: 'asd', syllableCount: 2, expected: false },
        { word: ['daf', 'asd'], nextSyllable: 'asd', syllableCount: 3, expected: false },
        { word: ['asd', 'daf'], nextSyllable: 'asd', syllableCount: 3, expected: false },
        { word: ['la', 'asd', 'daf'], nextSyllable: 'asd', syllableCount: 4, expected: false },
        { word: ['asd', 'daf'], nextSyllable: 'blah', syllableCount: 3, expected: true },
      ],
      rules: [distinct],
    },
    {
      title: 'Not after',
      testCases: [
        { word: ['ad'], nextSyllable: 'da', syllableCount: 2, expected: false },
        { word: ['at'], nextSyllable: 'da', syllableCount: 2, expected: false },
        { word: ['ath'], nextSyllable: 'da', syllableCount: 2, expected: false },
        { word: ['al'], nextSyllable: 'da', syllableCount: 2, expected: true },
      ],
      rules: [notAfter('d', 'd'), notAfter('t', 'd'), notAfter('th', 'd')],
    },
    {
      title: 'Not Same After',
      testCases: [
        { word: ['da'], nextSyllable: 'al', syllableCount: 2, expected: false },
        { word: ['de'], nextSyllable: 'el', syllableCount: 2, expected: false },
        { word: ['di'], nextSyllable: 'il', syllableCount: 2, expected: false },
        { word: ['do'], nextSyllable: 'ol', syllableCount: 2, expected: false },
        { word: ['du'], nextSyllable: 'ul', syllableCount: 2, expected: false },
        { word: ['asch'], nextSyllable: 'sche', syllableCount: 2, expected: false },
        { word: ['ack'], nextSyllable: 'cke', syllableCount: 2, expected: false },
        { word: ['ach'], nextSyllable: 'che', syllableCount: 2, expected: false },
        { word: ['atz'], nextSyllable: 'tze', syllableCount: 2, expected: false },
        { word: ['ath'], nextSyllable: 'the', syllableCount: 2, expected: false },
        { word: ['ast'], nextSyllable: 'ste', syllableCount: 2, expected: false },
        { word: ['ae'], nextSyllable: 'ste', syllableCount: 2, expected: true },
      ],
      rules: [...notSameSubsequentVocal, ...notSameSubsequentComposite],
    },
    {
      title: 'Unique Substring',
      testCases: [
        { word: ['asy'], nextSyllable: 'by', syllableCount: 2, expected: false },
        { word: ['as'], nextSyllable: 'by', syllableCount: 2, expected: true },
      ],
      rules: [uniqueSubstring('y')],
    },
    {
      title: 'Not same starting',
      testCases: [
        { word: ['cy'], nextSyllable: 'ca', syllableCount: 2, expected: false },
        { word: ['ad', 'sa'], nextSyllable: 'ca', syllableCount: 3, expected: true },
      ],
      rules: [notSameStarting('c')],
    },
    {
      title: 'Not more than',
      testCases: [
        { word: ['ci', 'saii'], nextSyllable: 'ci', syllableCount: 3, expected: false },
        { word: ['adi', 'sai'], nextSyllable: 'ci', syllableCount: 3, expected: true },
      ],
      rules: [notMoreThan('i', 3)],
    },
    {
      title: 'Not more than except',
      testCases: [
        { word: ['ca', 'sama'], nextSyllable: 'ma', syllableCount: 3, expected: false },
        { word: ['cae', 'sai'], nextSyllable: 'ma', syllableCount: 3, expected: true },
      ],
      rules: [notMoreThanExcept('a', 3, 'ae')],
    },
    {
      title: 'Infix not following on',
      testCases: [
        { word: ['al'], nextSyllable: 'sal', syllableCount: 3, expected: false },
        { word: ['al', 'eb'], nextSyllable: 'sel', syllableCount: 4, expected: false },
        { word: ['cae', 'sai'], nextSyllable: 'sal', syllableCount: 4, expected: true },
      ],
      rules: [infixNotFollowingOn('l', 'l')],
    },
  ];
  tests.forEach(({ title, testCases, rules }) =>
    describe(`${title}`, () => {
      testCases.forEach(({ word, nextSyllable, expected, syllableCount }) =>
        it(`should ${expected ? 'allow' : 'not allow'} syllable[${nextSyllable}] to be added to word[${word}]`, () =>
          expect(evaluateRules(rules, word, nextSyllable, syllableCount) === -1).toBe(expected)),
      );
    }),
  );
});
