declare module 'react-native-webview-bridge' {
  import * as React from 'react';
  import {
    WebViewPropertiesAndroid,
    WebViewPropertiesIOS,
    WebViewUriSource,
    WebViewHtmlSource,
    Insets,
    NavState,
    ViewStatic,
    ViewStyle,
  } from 'react-native';

  interface WebViewBridgeProps
      extends WebViewPropertiesAndroid,
      WebViewPropertiesIOS,
      React.Props<WebViewBridgeRef> {

    // Bridge message callback.
    onBridgeMessage?: (msg: string) => void;

    // React Native's Original webview props.
    automaticallyAdjustContentInsets?: boolean;
    bounces?: boolean;
    contentInset?: Insets;
    injectedJavaScript?: string;
    javaScriptEnabled?: boolean;
    onNavigationStateChange?: ( event: NavState ) => void;
    onShouldStartLoadWithRequest?: () => boolean;
    renderError?: () => ViewStatic;
    renderLoading?: () => JSX.Element;
    scrollEnabled?: boolean;
    startInLoadingState?: boolean;
    style?: ViewStyle;
    source?: WebViewUriSource | WebViewHtmlSource | number;
  }

  interface WebViewBridgeRef extends React.Component<WebViewBridgeProps, void> {
    // Original methods.
    goBack(): void;
    goForward(): void;
    reload(): void;

    sendToBridge(msg: string): void;
  }

  interface WebViewBridge extends React.ComponentClass<WebViewBridgeProps> {
  }

  export namespace WebViewBridge {
    export type Props = WebViewBridgeProps;
    export type Ref = WebViewBridgeRef;
  }

  export const WebViewBridge: WebViewBridge;
}
