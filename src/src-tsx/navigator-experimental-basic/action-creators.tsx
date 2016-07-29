import * as A from './actions';
import * as S from './state';

type TypedDispatch<A> = (a: A) => A;

// What if we need to inject some of our states to the action creators?
export function all(dispatch: TypedDispatch<A.Action>) {
  return {
    incr: () => {
      dispatch({ type: 'COUNTER_INCR' });
    },
    decr: () => {
      dispatch({ type: 'COUNTER_DECR' });
    },
    push: () => {
      dispatch({ type: 'NAV_PUSH' });
    },
    pop: () => {
      dispatch({ type: 'NAV_POP' });
    },
    useLanguage: (lang: S.Language) => {
      dispatch({ type: 'SET_LANGUAGE', lang });
    },
  };
};

