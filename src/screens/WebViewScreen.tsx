import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { RouteProps } from "@/types/navigation";
import { colors } from "@/constants";
import styled from "styled-components/native";

function WebViewScreen() {
  const route = useRoute<RouteProps<"WebViewScreen">>();
  const navigation = useNavigation();
  const { uri, title } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <WebView
        source={{ uri }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <LoadingIndicator>
          <ActivityIndicator size="large" color={colors.primary_50} />
        </LoadingIndicator>
      )}
    </SafeAreaView>
  );
}

const LoadingIndicator = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export default WebViewScreen;
