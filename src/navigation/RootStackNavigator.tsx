import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { colors } from "@/constants";
import { MainSearchScreen } from "@/screens/Home";

import { WebViewScreen } from "@/screens";
import { RootStackParamList } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: {
      color: colors.white,
      fontFamily: "Pretendard-ExtraBold",
      fontSize: 18,
    },
    headerStyle: {
      height: 100,
      backgroundColor: colors.primary_50,
      elevation: 0,
      shadowOpacity: 0,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitleAlign: "center",
    headerLeft: ({ canGoBack, onPress }) =>
      canGoBack && (
        <Ionicons
          style={{ marginLeft: 10 }}
          name="chevron-back"
          size={20}
          color={colors.white}
          onPress={onPress}
        />
      ),
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* FIXME: <RootStack.Navigator id={undefined} .../> 추가하면 타입 에러는 안나는데 정확한 이유를 알수 없어 ignore 처리 */}
        {/* @ts-ignore */}
        <RootStack.Navigator screenOptions={screenOptions}>
          <RootStack.Screen
            name="MainSearchScreen"
            component={MainSearchScreen}
            options={{ title: "검색" }}
          />
          <RootStack.Screen name="WebViewScreen" component={WebViewScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootStackNavigator;
