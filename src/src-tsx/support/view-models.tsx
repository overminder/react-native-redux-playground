export interface Count {
  v: number;
}

export interface Button {
  text: string;
  onPress: () => void;
}

export interface HasChild {
  children?: JSX.Element;
}

export interface CounterButtons {
  incr: () => void;
  decr: () => void;
}

export interface CounterState {
  count: Count;
}

export interface CounterButtonLabels {
  incrLabel: string;
  decrLabel: string;
}

export type CounterWithButtons = CounterButtons & CounterState;
export type CounterWithLabeledButtons = CounterWithButtons & CounterButtonLabels;

export type LoadingState = { loading: boolean };
export type AsyncCounterWithButtons = CounterWithButtons & LoadingState;

export type Language = 'en' | 'zh';

export namespace Language {
  export function theOther(x: Language): Language {
    switch (x) {
    case 'en':
      return 'zh';
    case 'zh':
      return 'en';
    default:
      return x as never;
    }
  }

  export interface Choosable<A> {
    zh: A;
    en: A;
  }

  export function choose<A>(x: Language, cs: Choosable<A>) {
    switch (x) {
    case 'en':
      return cs.en;
    case 'zh':
      return cs.zh;
    default:
      return cs.en as never;
    }
  }
}

export interface Scene {
  index: number;
}

export interface Page {
  key: string;
  title: string;
}

export interface CounterPage extends Page {
  count: number;
}

export interface MultipageCounter extends CounterButtons, LanguagePicker {
  nav: {index: number, routes: ReadonlyArray<CounterPage>};
  push: () => void;
  pop: () => void;
}

export interface LanguagePicker {
  lang: Language;
  useLanguage: (lang: Language) => void;
}
