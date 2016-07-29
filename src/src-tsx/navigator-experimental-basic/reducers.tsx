import * as U from 'app/support/util';
import * as A from './actions';
import * as S from './state';

function reduceCounter(s: S.Page, a: A.Action) {
  s = s || S.defaultPage;

  switch (a.type) {
  case A.Kind.CounterIncr:
    return U.copyWith(s, s => s.count += 1);
  case A.Kind.CounterDecr:
    return U.copyWith(s, s => s.count -= 1);
  default:
    return s;
  }
}

function reduceNav(s: S.NavState, a: A.Action) {
  s = s || S.defaultNavState;

  switch (a.type) {
  case A.Kind.NavPush:
    return U.copyWith(s, s => {
      s.index += 1;
      s.routes = U.Arrays.push(s.routes, U.copyWith(S.defaultPage, p => {
        p.key = p.title = `Page${s.index}`;
      }));
    });
  case A.Kind.NavPop:
    if (s.index > 0) {
      return U.copyWith(s, s => {
        s.index -= 1;
        s.routes = U.Arrays.pop(s.routes)[0];
      });
    } else {
      return s;
    }
  default:
    return s;
  }
}

function reduceTop(s: S.State, a: A.Action) {
  switch (a.type) {
  case A.Kind.SetLanguage:
    let s1 = S.State2Lang.setL(s, a.lang);
    if (s !== s1) {
      s1 = touchRoutes(s1);
    }
    return s1;
  default:
    return s;
  }
}

const State2Routes = U.Lens.compose(S.State2Nav, S.Nav2Routes);
const State2LastRoute = U.Lens.compose(State2Routes, U.Lens.last<S.Page>());

interface HasVersion {
  __refreshVersion__?: number;
}

// This works around react-native NavigationExperimental's pure render mixin check.
function touch<A extends Object>(x0: A): A {
  const x = Object.assign({}, x0) as any as HasVersion;
  x.__refreshVersion__ = (x.__refreshVersion__ || 0) + 1;
  return x as any;
}

const touchRoutes = U.Lens.modify(State2Routes, (xs: S.Page[]) => {
  return xs.map(x => touch(x));
});

// Manually composing the reducers can be repetitive.
// Fortunately we can write some combinators to reduce the repetition.
// (Are we over-engineering it?)
export const reduce = U.Fold.withDefault(S.defaultState, U.Fold.sequence([
  U.Fold.throughLens(S.State2Nav, reduceNav),
  U.Fold.throughLens(State2LastRoute, reduceCounter),
  reduceTop,
]));

