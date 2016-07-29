export type CounterAction = {
  type: 'INCR',
} | {
  type: 'DECR',
} | {
  type: 'LOAD_START',
} | {
  type: 'LOAD_DONE',
};
