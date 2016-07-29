import { Lens } from 'app/support/util';

export interface State {
  count: number;
}

export const defaultState: State = {
  count: 0,
};

export const State2Count = Lens.attr<State, number>(s => s.count, (s, a) => s.count = a);
