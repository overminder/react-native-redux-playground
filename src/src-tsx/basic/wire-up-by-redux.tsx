import * as React from 'react'; React;
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import * as C from 'app/support/pure-components';
import * as M from 'app/support/view-models';

import * as ActionCreators from './redux/action-creators';
import * as Reducers from './redux/reducers';

function store2Props(count: M.Count): M.CounterState {
  return { count };
}

const WiredUpCounter0 = connect(store2Props, ActionCreators.all)(C.CounterWithButtons);

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
