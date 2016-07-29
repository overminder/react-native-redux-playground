import * as React from 'react'; React;
import {
  ComponentClass,
  ViewStyle,
} from 'react-native';

// Type definitions for RN 0.31.0-rc.0's NavigationExperimental.
export declare namespace NE {
  export interface Route {
    key: string;
    title?: string;
  }

  export interface State {
    routes: ReadonlyArray<Route>;
    index: number;
  }

  export interface Scene {
    index: number;
    isActive: boolean;
    key: string;
    route: Route;
  }

  export interface TransitionProps {
    scene: Scene;
    scenes: ReadonlyArray<Scene>;
    navigationState: State;
  }

  export interface CardStackProps {
    direction?: 'horizontal' | 'vertical';
    navigationState: State;
    onNavigateBack?: () => void;
    renderOverlay?: SceneRenderer;
    renderScene: SceneRenderer;
    cardStyle?: ViewStyle;
    style?: ViewStyle;
  }

  export interface HeaderProps extends TransitionProps {
    renderLeftComponent?: SubViewRenderer;
    renderRightComponent?: SubViewRenderer;
    renderTitleComponent?: SubViewRenderer;
    onNavigateBack?: () => void;
    style?: ViewStyle;
  }

  export interface SubViewProps extends TransitionProps {
    onNavigateBack?: () => void;
  }

  export type SceneRenderer = (props: TransitionProps) => JSX.Element | null;
  export type SubViewRenderer = (props: SubViewProps) => JSX.Element | null;

  export const CardStack: ComponentClass<CardStackProps>;
  export const Header: ComponentClass<HeaderProps> & {
    BackButton: ComponentClass<{ onPress: () => void }>;
  };
}
