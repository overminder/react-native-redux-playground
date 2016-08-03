import * as S from './state';

// Still, a sane sum type support is much better than this ugly hack...

export const enum Kind {
  CounterIncr,
  CounterDecr,
  NavPush,
  NavPop,
  SetLanguage,
}

export type Action = {
  type: Kind.CounterIncr,
} | {
  type: Kind.CounterDecr,
} | {
  type: Kind.NavPush,
} | {
  type: Kind.NavPop,
} | {
  type: Kind.SetLanguage,
  lang: S.Language,
};
