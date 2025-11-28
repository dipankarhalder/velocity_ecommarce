import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { phoneList } from "../constant/static";

export default function RecommendedPhone() {
  const router = useRouter();

  return (
    <View className="w-full flex-col mb-[30px]">
      <View className="w-full mb-3">
        <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
          Best Phone Collections
        </Text>
      </View>
      <FlatList
        horizontal
        data={phoneList}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { id, title, imgUrl, price } = item;
          return (
            <TouchableOpacity
              className="w-[150px] mr-4 flex-col items-center rounded-[10px] border border-gray-300 px-3 pt-5 pb-2"
              onPress={() => router.push(`/phone/${id}`)}
              key={id}
            >
              <View className="w-auto overflow-hidden relative mb-2">
                <Image source={imgUrl} className="w-[65px] h-[80px]" />
              </View>
              <View className="w-auto py-2 px-0 relative">
                <Text
                  className="text-[13px] text-black text-center pr-2 font-nunitosans-semibold mb-3"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
                <Text className="text-[15px] text-[#ff0000] text-center font-nunitosans-bold">
                  ₹ {price} /-
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
