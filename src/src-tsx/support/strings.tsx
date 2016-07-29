import { Language } from './view-models';

interface Strings {
  incr: string;
  decr: string;
}

const EN: Strings = {
  incr: 'Incr',
  decr: 'Decr',
};

const ZH: Strings = {
  incr: '加',
  decr: '減',
};

const strings: Language.Choosable<Strings> = {
  zh: ZH,
  en: EN,
};

function chooseByLanguage(x: Language): Strings {
  return Language.choose(x, strings);
}

export default chooseByLanguage;
