import * as S from './state';

export type Action = {
  type: 'COUNTER_INCR',
} | {
  type: 'COUNTER_DECR',
} | {
  type: 'NAV_PUSH',
} | {
  type: 'NAV_POP',
} | {
  type: 'SET_LANGUAGE',
  lang: S.Language,
};
