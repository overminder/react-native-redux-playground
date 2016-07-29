// Support: presentational components.

import * as React from 'react'; React;
import {
  View,
  ViewStyle,
  Text,
  StyleSheet,
  TouchableOpacity,
  NavigationExperimental,
} from 'react-native';

import * as M from './view-models';
import { NE } from './navigation-experimental';
import stringsByLanguage from './strings';

// Typing hack.
const { CardStack, Header } = NavigationExperimental as any as typeof NE;

// NOTE: This is much faster than the animated navigation container.
export function AnimationlessMultipageCounter(mcPs: M.MultipageCounter) {
  const { nav, lang, incr, decr, push, pop, useLanguage } = mcPs;
  const strings = stringsByLanguage(lang);

  const route = nav.routes[nav.index];

  function renderCounter() {
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

  function renderOverlay() {
    return (
      <Row>
        {renderBackButton()}
        {centeredText(route.title)}
        {renderRightButton()}
      </Row>
    );
  }

  function renderBackButton() {
    if (nav.index === 0) {
      return null;
    } else {
      return <Header.BackButton onPress={pop} />;
    }
  }

  function renderRightButton() {
    return (
      <TouchableOpacity onPress={push} style={styles.center}>
        <View style={styles.navRightButton}>
          <Text>Next</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <List>
      {renderOverlay()}
      {renderCounter()}
    </List>
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
    // CardStack.renderScene.

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

const styles = StyleSheet.create({
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
});
