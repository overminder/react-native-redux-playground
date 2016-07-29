import { copyWith } from 'app/support/util';
import * as A from './actions';
import * as S from './state';

export function reduceCounterAction(s: S.State, a: A.CounterAction) {
  s = s || S.defaultState;

  switch (a.type) {
  case 'INCR':
    return copyWith(s, s => s.count += 1);
  case 'DECR':
    return copyWith(s, s => s.count -= 1);
  case 'LOAD_START':
    return copyWith(s, s => s.nLoading += 1);
  case 'LOAD_DONE':
    return copyWith(s, s => s.nLoading -= 1);
  default:
    return s;
  }
}
