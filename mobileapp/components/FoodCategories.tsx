import React from "react";
import { View, Text, FlatList } from "react-native";
import { foodCategories } from "../constant/static";

export default function FoodItemCategories() {
  return (
    <View className="w-full flex-col mb-[30px] gap-[10px]">
      <FlatList
        horizontal
        data={foodCategories}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { id, title, offer, Icons } = item;
          return (
            <View
              className="w-auto mr-3 flex-row items-center gap-2 border py-1 pl-2 pr-4 border-gray-300 bg-gray-50 rounded-lg"
              key={id}
            >
              <Icons size={50} color="#000" />
              <View className="flex-col">
                <Text className="text-[14px] text-black font-nunitosans-semibold mb-[1px]">
                  {title}
                </Text>
                <Text className="text-[11px] text-[#ff0000] font-nunitosans-semibold">
                  upto {offer} off
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
