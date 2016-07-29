// Basic: comparison between the traditional style and the redux style global state management.

import * as PS from './wire-up-by-private-state';
import * as RD from './wire-up-by-redux';

const kUseRedux = true;
export const Main = kUseRedux ? RD.WiredUpCounter : PS.WiredUpCounter;

