import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { productList } from "../constant/static";

export default function Recommended() {
  const router = useRouter();

  return (
    <View className="w-full flex-col mb-[30px]">
      <View className="w-full mb-3">
        <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
          Best Selling Products
        </Text>
      </View>
      <FlatList
        horizontal
        data={productList}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { id, title, imgUrl, price, mainPrice } = item;
          return (
            <TouchableOpacity
              className="w-[150px] mr-4 flex-col items-center rounded-[10px] border border-gray-300 px-3 pt-3 pb-2"
              onPress={() => router.push(`/details/${item.id}`)}
              key={id}
            >
              <View className="w-auto overflow-hidden rounded-[10px] relative">
                <Image source={imgUrl} className="w-[80px] h-[80px]" />
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
                <Text className="text-[13px] text-gray-400 text-center font-nunitosans-bold line-through">
                  ₹ {mainPrice} /-
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
