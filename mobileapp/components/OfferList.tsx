import React from "react";
import { View, Image, Text, FlatList } from "react-native";
import { offerList } from "../constant/static";

export default function OfferList() {
  return (
    <View className="w-full flex-col mb-[40px]">
      <View className="w-full mb-3">
        <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
          Our Selling Brands
        </Text>
      </View>
      <FlatList
        horizontal
        data={offerList}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            className="w-[120px] h-[80px] mr-4 justify-center items-center border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <Image
              source={item.imgUrl}
              resizeMode="contain"
              className="w-[90%] h-[90%]"
            />
          </View>
        )}
      />
    </View>
  );
}
