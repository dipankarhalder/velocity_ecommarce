import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  main_splash_screen_logo,
  splash_screen_background,
} from "../constant/static";
import { pathItem } from "../constant/routes";

const { width } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace(pathItem.login as any);
    }, 3000);
  }, [router]);

  return (
    <View className="flex-1 bg-white">
      {/* Onboarding slides */}
      <ScrollView
        pagingEnabled
        className="flex-1 pt-[70px]"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: screenHeight }}
      >
        <ImageBackground
          resizeMode="cover"
          source={splash_screen_background}
          style={{ width, height: screenHeight }}
          className="flex-1 items-center justify-center"
        />
      </ScrollView>

      {/* Logo */}
      <View className="absolute top-[18px] w-full flex-row justify-center space-x-2">
        <Image
          source={main_splash_screen_logo}
          style={{ width: 220, height: 220 }}
          resizeMode="contain"
        />
      </View>

      {/* Bottom text */}
      <View className="absolute bottom-[60px] w-full flex-row justify-center space-x-2">
        <Text className="text-white text-xl font-nunitosans-semibold">
          Please wait...
        </Text>
      </View>
    </View>
  );
}
