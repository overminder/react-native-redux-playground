import * as React from 'react'; React;
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import * as C from 'app/support/pure-components';

import * as S from './state';
import * as AC from './action-creators';
import * as R from './reducers';

function justS(s: S.State) {
  return { count: { v: s.count } };
}

const WiredUpCounter0 = connect(justS, AC.all)(C.CounterWithButtons);

export class WiredUpCounter extends React.Component<void, void> {
  private store = createStore(R.reduce, applyMiddleware(thunk));

  render() {
    return (
      <Provider store={this.store}>
        <WiredUpCounter0 />
      </Provider>
    );
  }
}
