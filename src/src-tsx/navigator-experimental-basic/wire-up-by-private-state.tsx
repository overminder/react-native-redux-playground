import * as React from 'react'; React;
import { autobind } from 'core-decorators';

import * as C from 'app/support/pure-components';
import * as M from 'app/support/view-models';

import * as A from './actions';
import * as S from './state';
import * as R from './reducers';

// This is not any faster than the React-Redux one. In fact the slow down is introduced by RN's
// NavigationExperimental.
@autobind
export class WiredUpCounter extends React.Component<void, S.State> {
  private actions = {
    incr: this.incr,
    decr: this.decr,
    push: this.push,
    pop: this.pop,
    useLanguage: this.useLanguage,
  };

  constructor() {
    super();

    this.state = S.defaultState;
  }

  incr() {
    this.setState(R.reduce(this.state, { type: A.Kind.CounterIncr }));
  }

  decr() {
    this.setState(R.reduce(this.state, { type: A.Kind.CounterDecr }));
  }

  push() {
    this.setState(R.reduce(this.state, { type: A.Kind.NavPush }));
  }

  pop() {
    this.setState(R.reduce(this.state, { type: A.Kind.NavPop }));
  }

  useLanguage(x: M.Language) {
    this.setState(R.reduce(this.state, { type: A.Kind.SetLanguage, lang: x }));
  }

  render() {
    return (
      <C.AnimationlessMultipageCounter
        {...this.state}
        {...this.actions}
      />
    );
  }
}
