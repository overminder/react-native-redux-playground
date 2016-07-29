import { delay } from 'app/support/util';
import * as A from './actions';

type TypedDispatch<A> = (a: A) => A;

export function all(dispatch: TypedDispatch<A.CounterAction>) {
  return {
    incr: async () => {
      dispatch({ type: 'LOAD_START' });
      await delay(1000);
      dispatch({ type: 'LOAD_DONE' });
      dispatch({ type: 'INCR' });
    },
    decr: async () => {
      dispatch({ type: 'LOAD_START' });
      await delay(1000);
      dispatch({ type: 'LOAD_DONE' });
      dispatch({ type: 'DECR' });
    },
  };
};

