// Support: presentational components.

import * as React from 'react'; React;
import {
  View,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
  NavigationExperimental,

  PixelRatio,
  Platform,
} from 'react-native';

import * as M from './view-models';
import { NE } from './navigation-experimental';
import * as WV from '../webview-bug/simple';
import stringsByLanguage from './strings';

// Typing hack.
const { CardStack, Header } = NavigationExperimental as any as typeof NE;

export function renderWebViewScene() {
  return (
    <View style={{marginTop: Header.HEIGHT, flex: 1}}>
      <WV.Simple />
    </View>
  );
}

// NOTE: This is much faster than the animated navigation container.
export function AnimationlessMultipageCounter(mcPs: M.MultipageCounter) {
  const { nav, lang, incr, decr, push, pop, useLanguage } = mcPs;
  const strings = stringsByLanguage(lang);

  const route = nav.routes[nav.index];

  function renderCounter(route: M.CounterPage) {
    const scene = (
      <List>
        <LanguagePicker lang={lang} useLanguage={useLanguage} />
        <CounterWithLabeledButtons
          incr={incr}
          incrLabel={strings.incr}
          decr={decr}
          decrLabel={strings.decr}
          count={{v: route.count}}
        />
      </List>
    );
    return (
      <View style={styles.scene} key={route.key}>
        {scene}
      </View>
    );
  }

  function renderScenes() {
    return <View style={styles.flex}>{nav.routes.map(renderCounter)}</View>;
  }

  function renderOverlay() {
    return (
      <View style={styles.appBar}>
        {renderBackButton()}
        <View style={styles.appBarTitle}>
          <Header.Title>{route.title}</Header.Title>
        </View>
        {renderRightButton()}
      </View>
    );
  }

  function renderBackButton() {
    if (nav.index === 0) {
      return null;
    } else {
      return (
        <View style={styles.appBarLeft}>
          <Header.BackButton onPress={pop} />
        </View>
      );
    }
  }

  function renderRightButton() {
    return (
      <TouchableOpacity onPress={push} style={[styles.center, styles.appBarRight]}>
        <View style={styles.navRightButton}>
          <Text>Next</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.flex}>
      {renderScenes()}
      {renderOverlay()}
    </View>
  );
}

export function MultipageCounter(mcPs: M.MultipageCounter) {
  // Note that the state portion from ps can be stale and thus should not be used.

  const { nav, lang, incr, decr, push, pop, useLanguage } = mcPs;
  const strings = stringsByLanguage(lang);

  function renderCounter(tps: NE.TransitionProps) {
    // console.warn(tps.scenes.map(s => s.isActive ? 'A' : '.').join(''));

    // if (tps.scene.isActive) {
    // ^ Can't do the checking since isActive is not `watched` by NavigationExperimental in

    const route = tps.scene.route as M.CounterPage;
    return (
      <List>
        <LanguagePicker lang={lang} useLanguage={useLanguage} />
        <CounterWithLabeledButtons
          incr={incr}
          incrLabel={strings.incr}
          decr={decr}
          decrLabel={strings.decr}
          count={{v: route.count}}
        />
      </List>
    );
  }

  function renderOverlay(tps: NE.TransitionProps) {
    return (
      <Header {...tps}
        renderLeftComponent={renderBackButton}
        renderRightComponent={renderRightButton}
      />
    );
  }

  function renderBackButton(tps: NE.TransitionProps) {
    if (tps.scene.index === 0) {
      return null;
    } else {
      return <Header.BackButton onPress={pop} />;
    }
  }

  function renderRightButton(_: NE.SubViewProps) {
    return (
      <TouchableOpacity onPress={push} style={styles.center}>
        <View style={styles.navRightButton}>
          <Text>Next</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CardStack
      onNavigateBack={pop}
      navigationState={nav}
      renderScene={renderCounter}
      renderOverlay={renderOverlay}
    />
  );
}

export function Row(ps: M.HasChild) {
  return (
    <View style={styles.row}>
      {ps.children}
    </View>
  );
}

export function List(ps: M.HasChild) {
  return (
    <View style={styles.center}>
      {ps.children}
    </View>
  );
}

function centeredText(text: string) {
  return (
    <View style={styles.center}>
      <Text>{text}</Text>
    </View>
  );
}

export function Counter(ps: M.Count) {
  return centeredText(String(ps.v));
}

export function Button(ps: M.Button) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={ps.onPress}>
      <Text>{ps.text}</Text>
    </TouchableOpacity>
  );
}

export function CounterWithButtons(ps: M.CounterWithButtons) {
  return <CounterWithLabeledButtons {...ps} incrLabel='+' decrLabel='-' />;
}

export function CounterWithLabeledButtons(ps: M.CounterWithLabeledButtons) {
  return (
    <Row>
      <Counter {...ps.count} />
      <Button text={ps.incrLabel} onPress={ps.incr} />
      <Button text={ps.decrLabel} onPress={ps.decr} />
    </Row>
  );
}

export function LanguagePicker(ps: M.LanguagePicker) {
  const theOther = M.Language.theOther(ps.lang);
  return (
    <Row>
      {centeredText(ps.lang)}
      <Button text={'Use ' + theOther} onPress={() => ps.useLanguage(theOther)} />
    </Row>
  );
}

export function AsyncCounterWithButtons(ps: M.AsyncCounterWithButtons) {
  const style: ViewStyle[] = [styles.center];
  if (ps.loading) {
    style.push({
      backgroundColor: ps.loading ? 'grey' : undefined,
    });
  }

  return (
    <View style={style}>
      <CounterWithButtons {...ps} />
    </View>
  );
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    flexDirection: 'row' as 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  navRightButton: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginRight: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'grey',
    // width: 50,
    height: 40,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  appBar: {
    alignItems: 'center' as any,
    backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    borderBottomWidth: Platform.OS === 'ios' ? (1 / PixelRatio.get()) : 0,
    elevation: 4,
    flexDirection: 'row' as any,
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    justifyContent: 'flex-start' as any,
    left: 0,
    marginBottom: 16, // This is needed for elevation shadow
    position: 'absolute' as any,
    right: 0,
    top: 0,
  },
  appBarTitle: {
    bottom: 0,
    left: APPBAR_HEIGHT,
    marginTop: STATUSBAR_HEIGHT,
    position: 'absolute' as any,
    right: APPBAR_HEIGHT,
    top: 0,
  },
  appBarLeft: {
    bottom: 0,
    left: 0,
    marginTop: STATUSBAR_HEIGHT,
    position: 'absolute' as any,
    top: 0,
  },
  appBarRight: {
    bottom: 0,
    marginTop: STATUSBAR_HEIGHT,
    position: 'absolute' as any,
    right: 0,
    top: 0,
  },
  scene: {
    /* Any of below (any decoration?) causes WebView on Android to lose its height.
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    backgroundColor: '#E9E9EF',
    */
    bottom: 0,
    left: 0,
    position: 'absolute' as any,
    right: 0,
    top: HEADER_HEIGHT,
  },
});
