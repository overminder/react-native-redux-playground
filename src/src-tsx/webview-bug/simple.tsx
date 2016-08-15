import * as React from 'react';
import {
  View,
  NavigationExperimental,
} from 'react-native';
import {
  WebViewBridge,
} from 'react-native-webview-bridge';

import { NE } from 'app/support/navigation-experimental';

const { CardStack } = NavigationExperimental as any as typeof NE;

const kSampleUri = 'http://www.smartone.com/smiles';

export function WebViewInsideCardStack() {
  const s = {
    routes: [{key: 'first'}],
    index: 0,
  };
  return (
    <CardStack
      navigationState={s}
      renderScene={Simple}
      style={{flex: 1}}
      />
  );
}

const kSampleHtml = `
<html>
  <head>
    <style>
      .red {
        background-color: red;
        height: 40%;
      }

      .yellow {
        background-color: yellow;
        height: 40%;
      }
    </style>
  </head>
  <body>
    <h1 class='red'>Hello</h1>
    <h1 class='yellow'>World</h1>
  </body>
</html>
`;

kSampleHtml;

export function Simple() {
  return (
    <WebViewBridge
      source={{uri: kSampleUri}}
      style={{flex: 1}}
      javaScriptEnabled={true}
      />
  );
}

export function Decorated() {
  const style = {
    backgroundColor: '#E9E9EF',
    flex: 1,
    // bottom: 0,
    // left: 0,
    // position: 'absolute' as any,
    // right: 0,
    // top: 0,
  };
  return <View style={style}><Simple /></View>;
}

// Doesn't work in NE.
export function Absolute() {
  return (
    <View style={{position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  }}
    >
      <Simple />
    </View>
  );
}

// Doesn't work in NE.
export function Fixed() {
  return (
    <View style={{width: 200, height: 200}}>
      <Simple />
    </View>
  );
}
