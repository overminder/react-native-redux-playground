import { Dispatch } from 'redux';
import * as A from './actions';

// Otherwise it might not be type-safe enough.
function ignore(_: any): void {
}

export function all(dispatch: Dispatch<A.CounterAction>) {
  return {
    incr: () => ignore(dispatch({ type: 'INCR' })),
    decr: () => ignore(dispatch({ type: 'DECR' })),
  };
};


/*
  NOTE: Can't use simple action creators (i.e. () => A) as they aren't safely supported in
  TypeScript 2.0. (need higher-kinded type support to parameterize the action type,
  or some kind of row-polymorphism to do a type-level fmap).

function incr(): A.CounterAction {
  return {
    type: 'INCR',
  };
}

function decr(): A.CounterAction {
  return {
    type: 'DECR',
  };
}

export const all = {
  incr,
  decr,
};

*/

