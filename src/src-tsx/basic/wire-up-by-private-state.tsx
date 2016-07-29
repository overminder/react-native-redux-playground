import * as React from 'react'; React;
import { autobind } from 'core-decorators';

import * as C from 'app/support/pure-components';
import * as M from 'app/support/view-models';

// This is the traditional way for building up stateful components: the states are kept
// private unless explicitly exposed (usually via callbacks passed in the props).

@autobind
export class WiredUpCounter extends React.Component<void, M.Count> {
  constructor() {
    super();
    this.state = {
      v: 0,
    };
  }

  incr() {
    this.setState({
      v: this.state.v + 1,
    });
  }

  decr() {
    this.setState({
      v: this.state.v - 1,
    });
  }

  render() {
    return (
      <C.CounterWithButtons
        incr={this.incr}
        decr={this.decr}
        count={this.state}
      />
    );
  }
}
