import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { listOfProducts, ban_bg } from "../constant/static";
import AddToCartButton from "../components/AddToCartButton";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 48) / 2;

export default function MainFeatureList() {
  const router = useRouter();

  return (
    <View className="w-full flex-col mb-[40px]">
      <View className="w-full mb-3">
        <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
          List of Products
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {listOfProducts.map((foodItem) => (
          <View
            style={{ width: itemWidth }}
            className="rounded-[10px] border border-gray-300 px-3 pt-3 pb-5 mb-4"
            key={foodItem.id}
          >
            <TouchableOpacity
              className="flex-col items-center"
              onPress={() => router.push(`/details/${foodItem.id}`)}
            >
              <View className="overflow-hidden rounded-[10px]">
                <Image source={foodItem.imgUrl} className="w-[80px] h-[80px]" />
              </View>
              <View className="py-2">
                <Text
                  className="text-[13px] text-black text-center font-nunitosans-semibold mb-3"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {foodItem.title}
                </Text>
                <Text className="text-[15px] text-[#ff0000] text-center font-nunitosans-bold">
                  ₹ {foodItem.price} /-
                </Text>
                <Text className="text-[13px] text-gray-400 text-center font-nunitosans-bold line-through">
                  ₹ {foodItem.mainPrice} /-
                </Text>
              </View>
            </TouchableOpacity>
            <View className="w-full flex-row justify-center relative mt-1">
              <AddToCartButton product={foodItem} />
            </View>
          </View>
        ))}
      </View>
      <View className="w-full mt-[40px] overflow-hidden rounded-lg">
        <Image source={ban_bg} className="w-full h-[220px]" />
      </View>
    </View>
  );
}
