import * as React from 'react'; React;
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import * as C from 'app/support/pure-components';
import * as M from 'app/support/view-models';

import * as S from './state';
import * as ActionCreators from './action-creators';
import * as Reducers from './reducers';

function store2Props(s: S.State): M.CounterState & M.LoadingState {
  return { count: { v: s.count }, loading: s.nLoading > 0 };
}

// XXX: C.CounterWitnButtons might not type check here - React's StatelessComponenet for some reason
// type its props as (P | undefined).
// The simplest way to fix this is to monkey patch react.d.ts...
const WiredUpCounter0 = connect(store2Props, ActionCreators.all)(C.AsyncCounterWithButtons);

export class WiredUpCounter extends React.Component<void, void> {
  private store = createStore(Reducers.reduceCounterAction);

  render() {
    return (
      <Provider store={this.store}>
        <WiredUpCounter0 />
      </Provider>
    );
  }
}
