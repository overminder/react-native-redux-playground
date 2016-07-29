export function delay(ms: number) {
  return new Promise<void>(k => {
    setTimeout(k, ms);
  });
}

export function constant<A>(a: A): () => A {
  return () => a;
}

export namespace Arrays {
  export function push<A>(xs: ReadonlyArray<A>, x: A): ReadonlyArray<A> {
    const ys = xs.slice();
    ys.push(x);
    return ys;
  }

  export function pop<A>(xs: ReadonlyArray<A>): [ReadonlyArray<A>, A] {
    const ys = xs.slice();
    const y = ys.pop()!;
    return [ys, y];
  }
}

export type Fold<S, A> = (s: S, a: A) => S;

export namespace Fold {
  export function throughLens<S, A, B>(lens: Lens<S, A>, f: Fold<A, B>): Fold<S, B> {
    return (s, n) => Lens.modify(lens, a => f(a, n))(s);
  }

  export function sequence<S, A>(rs: Fold<S, A>[]): Fold<S, A> {
    return (s, a) => {
      rs.forEach(r => s = r(s, a));
      return s;
    };
  }

  export function withDefault<S, A>(s0: S, f: Fold<S, A>): Fold<S, A> {
    return (s = s0, a) => f(s, a);
  }
}

// NOTE: This is type-safer than directly calling Object.assign.
export function copyWith<S>(s0: S, f: (s: S) => void): S {
  const s = Object.assign({}, s0);
  f(s);
  return s;
}

// setL returns a copied S.
// XXX: return a diffing function to avoid excessive allocation?
export interface Lens<S, A> {
  setL(s: S, a: A): S;
  getL(s: S): A;
}

export namespace Lens {
  export function modify<S, A>(lens: Lens<S, A>, f: (a: A) => A): (s: S) => S {
    return s0 => {
      const a0 = lens.getL(s0);
      const a = f(a0);
      if (a !== a0) {
        return lens.setL(s0, a);
      } else {
        return s0;
      }
    };
  }

  export function compose<S, A, B>(sa: Lens<S, A>, ab: Lens<A, B>): Lens<S, B> {
    return {
      setL: (s, b) => modify(sa, a => modify(ab, () => b)(a))(s),
      getL: s => ab.getL(sa.getL(s)),
    };
  }

  export function index<A>(ix: number): Lens<A[], A> {
    return {
      setL: (xs, x) => {
        const x0 = xs[ix];
        if (x === x0) {
          return xs;
        } else {
          xs = xs.slice();
          xs[ix] = x;
          return xs;
        }
      },
      getL: xs => xs[ix],
    };
  }

  export function last<A>(): Lens<A[], A> {
    return {
      getL: xs => xs[xs.length - 1],
      setL: (xs, a) => {
        const a0 = xs[xs.length - 1];
        if (a === a0) {
          return xs;
        } else {
          xs = xs.slice();
          xs[xs.length - 1] = a;
          return xs;
        }
      },
    };
  };

  export function attr<S, A>(getL: (s: S) => A, setL: (s: S, a: A) => void): Lens<S, A> {
    return {
      setL: (s, a) => {
        const a0 = getL(s);
        if (a === a0) {
          return s;
        } else {
          return copyWith(s, s => setL(s, a));
        }
      },
      getL,
    };
  }
}
