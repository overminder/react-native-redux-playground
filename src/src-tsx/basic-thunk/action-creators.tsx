import * as A from './actions';
import * as S from './state';
import * as U from 'app/support/util';

type PutAction = (a: A.Action) => void;
type GetState = () => S.State;

async function waitAndIncr(dispatch: PutAction, getState: GetState, diff: number) {
  await U.delay(Math.floor(Math.random() * 5000));
  // Note that the getState call should happen right before the synchronous dispatch call,
  // or we might use some stale state.
  dispatch({
    type: 'SET_COUNTER',
    toValue: getState().count + diff,
  });
}

async function incrThunk(dispatch: PutAction, getState: GetState) {
  return waitAndIncr(dispatch, getState, 1);
}

async function decrThunk(dispatch: PutAction, getState: GetState) {
  return waitAndIncr(dispatch, getState, -1);
}

const incr = U.constant(incrThunk);
const decr = U.constant(decrThunk);

// TypeScript only accepts this instead of `import * as all from ...`.
export const all = { incr, decr };
