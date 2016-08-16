import * as React from 'react'; React;
import {
  View,
  // ViewStyle,
  ScrollView,
  TouchableOpacity,
  // Text,
  StyleSheet,
} from 'react-native';

function randNat(to: number, from?: number) {
  if (from === undefined) {
    from = 0;
  }
  return () => from + Math.floor(Math.random() * (to - from));
}

const randByte = randNat(256);

function randColor() {
  const r = randByte();
  const g = randByte();
  const b = randByte();
  return 'rgb(' + [r, g, b].join(',') + ')';
}

function fillArray<A>(mkA: () => A, len: number): A[] {
  const xs: A[] = [];
  for (let i = 0; i < len; ++i) {
    xs.push(mkA());
  }
  return xs;
}

interface Box {
  color: string;
}

function randBox(): Box {
  return {
    color: randColor(),
  };
}

function box(o: Box, key: number) {
  return (
    <TouchableOpacity key={key}>
      <View style={[{ backgroundColor: o.color }, styles.box]} />
    </TouchableOpacity>
  );
}

function row(bs: Box[], key: number) {
  return (
    <ScrollView style={{flex: 1}} horizontal key={key}>
      {bs.map(box)}
    </ScrollView>
  );
}

// 400 views: 1500 ms on HTC butterfly (10000 ms on Dev mode...).
// 150 ms on iOS (1000 ms on Dev mode).
// Seems that validating the JS props takes a large amount of time.
export function createMainProps() {
  const rowLens = fillArray(() => 20, 20);
  return {
    rows: rowLens.map(len => fillArray(randBox, len)),
  };
}

export type MainProps = {
  rows: Box[][],
}

export function Main(o: MainProps) {
  return (
    <ScrollView style={{flex: 1}}>
      {o.rows.map(row)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 100,
    margin: 5,
  },
});
