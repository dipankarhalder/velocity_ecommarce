import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuthStore } from "../store/auth";
import { pathItem } from "../constant/routes";

import "./global.css";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [authHydrated, setAuthHydrated] = useState(false);
  const { isAuthenticated, hydrate } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Medium": require("../assets/fonts/NunitoSans-Medium.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans-Bold.ttf"),
    "NunitoSans-ExtraBold": require("../assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await hydrate();
      setAuthHydrated(true);
    };
    prepare();
  }, [hydrate]);

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded && authHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authHydrated]);

  useEffect(() => {
    if (authHydrated) {
      if (isAuthenticated) {
        router.replace(pathItem.home as any);
      } else {
        router.replace(pathItem.login as any);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authHydrated]);

  if (!fontsLoaded || !authHydrated) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FF0000" />
        <Text className="mt-2 text-gray-600 font-nunitosans-semibold">
          Loading, please wait...
        </Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
