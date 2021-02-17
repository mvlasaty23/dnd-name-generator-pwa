import { LanguagePack } from '../model';
import { distinct, notSameSubsequentComposite, notSameSubsequentVocal } from './common-rule';
import dwarvish from './dwarvish';

const languagePack = dwarvish;
describe('Dwarvish', () => {
  describe('LanguagePack', () => {
    checkSyllableDefinition('dwarvish male', languagePack, 'male');
    checkSyllableDefinition('dwarvish female', languagePack, 'female');
  });
  describe('Rules', () => {
    it('should use some common rules', () => {
      [distinct, ...notSameSubsequentVocal, ...notSameSubsequentComposite].forEach((rule) =>
        expect(languagePack.rules.includes(rule)).toBeTruthy(),
      );
    });
  });
});
function checkSyllableDefinition(
  languageName: string,
  languagePack: LanguagePack,
  genderSelector: keyof LanguagePack['syllables'],
) {
  it(`should define ${languageName}[${genderSelector}] syllables`, () => {
    const genderSyllables = languagePack.syllables[genderSelector];
    expect(genderSyllables).toBeTruthy();
    expect(genderSyllables.prefix.length).toBeGreaterThanOrEqual(1);
    expect(genderSyllables.infix.length).toBeGreaterThanOrEqual(1);
    expect(genderSyllables.suffix.length).toBeGreaterThanOrEqual(1);
  });
}
