import * as A from './actions';
import * as S from './state';

type TypedDispatch<A> = (a: A) => A;

// Q: What if we need to inject some of our states to the action creators?
// A: Use redux-thunk.
export function all(dispatch: TypedDispatch<A.Action>) {
  return {
    incr: () => {
      dispatch({ type: A.Kind.CounterIncr });
    },
    decr: () => {
      dispatch({ type: A.Kind.CounterDecr });
    },
    push: () => {
      dispatch({ type: A.Kind.NavPush });
    },
    pop: () => {
      dispatch({ type: A.Kind.NavPop });
    },
    useLanguage: (lang: S.Language) => {
      dispatch({ type: A.Kind.SetLanguage, lang });
    },
  };
};

