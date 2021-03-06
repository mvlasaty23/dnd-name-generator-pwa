import { LanguagePack } from '../model';
import {
  distinct,
  notAfter,
  notMoreThan,
  notMoreThanExcept,
  notSameAfter,
  notSameStarting,
  notSameSubsequentVocal,
  uniqueSubstring,
} from './common-rule';

const elvish: LanguagePack = {
  rules: [
    distinct,
    uniqueSubstring('y'),
    uniqueSubstring('el'),
    uniqueSubstring('an'),
    ...notSameSubsequentVocal,
    notSameAfter('ae'),
    notSameAfter('r'),
    notSameAfter('d'),
    notSameAfter('x'),
    notAfter('t', 'd'),
    notAfter('th', 'd'),
    notAfter('a', 'e'),
    notAfter('n', 'aran'),
    notAfter('il', 'hil'),
    notAfter('yl', 'hil'),
    notSameStarting('c'),
    notMoreThan('i', 2),
    notMoreThanExcept('a', 4, 'ae'),
  ],
  syllables: {
    male: {
      prefix: [
        'aar',
        'ar',
        'ae',
        'aer',
        'aeg',
        'an',
        'and',
        'bar',
        'bae',
        'baer',
        'brae',
        'cae',
        'cele',
        'care',
        'carn',
        'da',
        'dae',
        'dar',
        'daer',
        'dyr',
        'dim',
        'dhor',
        'el',
        'fran',
        'frhon',
        'gara',
        'gar',
        'gae',
        'hal',
        'han',
        'haer',
        'harn',
        'hara',
        'hyl',
        'him',
        'ir',
        'lae',
        'pele',
        'phyl',
        'rho',
        'rae',
        'ryn',
        'saer',
        'sar',
        'san',
        'sim',
        'syl',
        'syn',
        'thal',
        'than',
        'thae',
        'thyr',
        'vys',
        'vaer',
        'var',
        'varn',
      ],
      infix: [
        'a',
        'ael',
        'an',
        'am',
        'ana',
        'amyl',
        'ad',
        'bran',
        'cae',
        'da',
        'darn',
        'ele',
        'en',
        'esth',
        'gyl',
        'hal',
        'hyn',
        'hil',
        'in',
        'lim',
        'laen',
        'lir',
        'la',
        'lyn',
        'min',
        'myl',
        'ma',
        'mal',
        'nir',
        'nyl',
        'na',
        'nar',
        'naer',
        'no',
        'o',
        'ra',
        'rae',
        'rho',
        'ran',
        'rean',
        'ryn',
        'rim',
        'ral',
        'ril',
        'sil',
        'sin',
        'sa',
        'til',
        'thyl',
        'vyn',
        'vaer',
        'yl',
        'yr',
        'yn',
      ],
      suffix: ['aran', 'dir', 'ed', 'hil'],
    },
    female: {
      prefix: [
        'aal',
        'al',
        'ae',
        'ael',
        'aeg',
        'an',
        'and',
        'bal',
        'bae',
        'bael',
        'brae',
        'bryn',
        'cae',
        'cere',
        'cale',
        'carn',
        'da',
        'dae',
        'dal',
        'dael',
        'dyl',
        'dim',
        'dhor',
        'el',
        'fran',
        'frhon',
        'gala',
        'gal',
        'gae',
        'har',
        'han',
        'hael',
        'harn',
        'hala',
        'hyr',
        'him',
        'il',
        'lae',
        'pere',
        'phyl',
        'rho',
        'rae',
        'ryn',
        'sael',
        'sal',
        'san',
        'sim',
        'syr',
        'syn',
        'thia',
        'thae',
        'thyl',
        'vys',
        'vael',
        'val',
      ],
      infix: [
        'a',
        'aer',
        'an',
        'am',
        'ana',
        'amyl',
        'ad',
        'bran',
        'cae',
        'da',
        'darn',
        'ere',
        'en',
        'esth',
        'gyl',
        'har',
        'hyn',
        'hil',
        'in',
        'lim',
        'laen',
        'lil',
        'la',
        'lyn',
        'min',
        'myr',
        'ma',
        'mal',
        'nir',
        'nyr',
        'na',
        'nar',
        'naer',
        'no',
        'o',
        'ra',
        'rae',
        'rho',
        'ran',
        'rean',
        'ryn',
        'rim',
        'rar',
        'ril',
        'sil',
        'sin',
        'sa',
        'til',
        'thyl',
        'vyn',
        'vaer',
        'yl',
        'yr',
        'yn',
      ],
      suffix: ['eth', 'wyn', 'nith', 'ril'],
    },
  },
};

export default elvish;
