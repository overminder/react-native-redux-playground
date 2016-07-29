import * as A from './actions';
import * as M from 'app/support/view-models';

export function reduceCounterAction(s: M.Count, a: A.CounterAction) {
  s = s || { v: 0 };

  switch (a.type) {
  case 'INCR':
    return { v: s.v + 1 };
  case 'DECR':
    return { v: s.v - 1 };
  default:
    return s;
  }
}
