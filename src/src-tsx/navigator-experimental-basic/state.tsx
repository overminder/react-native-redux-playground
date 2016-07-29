import { Lens } from 'app/support/util';
import * as M from 'app/support/view-models';

export const State2Nav = Lens.attr<State, NavState>(s => s.nav, (s, a) => s.nav = a);
export const State2Lang = Lens.attr<State, M.Language>(s => s.lang, (s, a) => s.lang = a);
export const Nav2Routes = Lens.attr<NavState, Pages>(s => s.routes, (s, a) => s.routes = a);

type Pages = ReadonlyArray<Page>;
export type Page = M.CounterPage;
export type Language = M.Language;

export interface NavState {
  routes: Pages;
  index: number;
}

export interface State {
  nav: NavState;
  lang: Language;
}

export const defaultPage: Page = {
  key: 'root',
  title: 'root',
  count: 0,
};

export const defaultNavState: NavState = {
  routes: [defaultPage],
  index: 0,
};

export const defaultState: State = {
  nav: defaultNavState,
  lang: 'en',
};
