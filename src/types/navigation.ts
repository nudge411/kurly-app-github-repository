import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  MainSearchScreen: undefined;
  WebViewScreen: {
    uri: string;
    title: string;
  };
};

export type NavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
