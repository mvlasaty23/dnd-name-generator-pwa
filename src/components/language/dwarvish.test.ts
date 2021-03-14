import { selectNextSyllable } from '../generator/name-generator';
import { Gender, LanguagePack, LanguageRule } from '../model';
import { distinct, notSameSubsequentComposite, notSameSubsequentVocal } from './common-rule';
import dwarvish from './dwarvish';

const languagePack = dwarvish;
describe('Dwarvish', () => {
  describe('LanguagePack', () => {
    languagePackLinter('dwarvish', languagePack, 'male');
    languagePackLinter('dwarvish', languagePack, 'female');
    syllableCheck('prefix', 'infix', languagePack.syllables, languagePack.rules);
    syllableCheck('prefix', 'suffix', languagePack.syllables, languagePack.rules);
    syllableCheck('infix', 'infix', languagePack.syllables, languagePack.rules);
    syllableCheck('infix', 'suffix', languagePack.syllables, languagePack.rules);
  });
  describe('Rules', () => {
    it('should use some common rules', () => {
      [distinct, ...notSameSubsequentVocal, ...notSameSubsequentComposite].forEach((rule) =>
        expect(languagePack.rules.includes(rule)).toBeTruthy(),
      );
    });
  });
});
type WordPart = 'prefix' | 'infix' | 'suffix';
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

function languagePackLinter(
  languageName: string,
  languagePack: LanguagePack,
  genderSelector: keyof LanguagePack['syllables'],
) {
  it(`should define ${languageName + '-' + genderSelector}[${genderSelector}] syllables`, () => {
    const genderSyllables = languagePack.syllables[genderSelector];
    expect(genderSyllables).toBeTruthy();
    expect(genderSyllables.prefix.length).toBeGreaterThanOrEqual(1);
    expect(genderSyllables.infix.length).toBeGreaterThanOrEqual(1);
    expect(genderSyllables.suffix.length).toBeGreaterThanOrEqual(1);
  });
}
