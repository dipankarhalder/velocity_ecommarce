import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { pathItem } from "../constant/routes";
import { User, Shop, Heart, Compare } from "../constant/icon";

export default function Header() {
  const router = useRouter();

  return (
    <View className="w-full flex-col mb-4 pt-3 px-5">
      <View className="flex-row w-full justify-between">
        <TouchableOpacity
          className="flex-row gap-3"
          onPress={() => router.push(pathItem.profile as any)}
        >
          <User color={"#000000"} />
          <View className="flex-col mt-[-2px]">
            <Text className="text-[16px] font-nunitosans-extrabold text-black">
              Hey, Ankit
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row gap-7">
          <Compare color="#000000" />
          <Heart color={"#000000"} />
          <Shop color={"#000000"} />
        </View>
      </View>
    </View>
  );
}
