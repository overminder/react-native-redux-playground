import * as S from './state';
import * as A from './actions';

export function reduce(s: S.State = S.defaultState, a: A.Action) {
  switch (a.type) {
  case 'SET_COUNTER':
    return S.State2Count.setL(s, a.toValue);
  default:
    return s;
  }
}
