import * as React from 'react'; React;
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import * as C from 'app/support/pure-components';

import * as S from './state';
import * as ActionCreators from './action-creators';
import * as Reducers from './reducers';

function justS(s: S.State) {
  return s;
}

const WiredUpCounter0 = connect(justS, ActionCreators.all)(C.MultipageCounter);

export class WiredUpCounter extends React.Component<void, void> {
  private store = createStore(Reducers.reduce);

  render() {
    return (
      <Provider store={this.store}>
        <WiredUpCounter0 />
      </Provider>
    );
  }
}
