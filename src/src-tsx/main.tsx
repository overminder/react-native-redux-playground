import * as React from 'react'; React;
import {
  AppRegistry,
  Alert,
} from 'react-native';

// import { Main } from './navigator-experimental-basic';
import { Main, MainProps, createMainProps } from './nested-scroll';

class Wrapped extends React.Component<void, { on: boolean }> {
  timings: {[name: string]: number} = {};
  mainProps: MainProps;

  constructor() {
    super();
    this.state = { on: false };
  }

  async timeit<A>(name: string, run: () => Promise<A>) {
    const t0 = new Date();
    const a = await run();
    const t1 = new Date();
    const dt = t1.getTime() - t0.getTime();
    this.timings[name] = dt;
    return a;
  }

  async componentDidMount() {
    this.mainProps = await this.timeit('createProps', async () => {
      return createMainProps();
    });
    await this.timeit('render', () => {
      return new Promise<void>(k => this.setState({ on: true }, k));
    });
    Alert.alert('Timings', JSON.stringify(this.timings));
  }

  render() {
    if (this.state.on) {
      return <Main {...this.mainProps} />;
    } else {
      return null as any;
    }
  }
}

AppRegistry.registerComponent('Example', () => Wrapped);
