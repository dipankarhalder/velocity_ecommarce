import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { productListNew } from "../constant/static";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 56) / 3;

export default function FeatureProducts() {
  return (
    <View className="w-full flex-col mb-[40px]">
      <View className="w-full mb-3">
        <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
          Popular Categories
        </Text>
      </View>
      <View className="flex-row flex-wrap w-full gap-3">
        {productListNew.map((item) => (
          <View
            style={{ width: itemWidth }}
            className="border border-gray-300 px-3 pt-4 pb-4 rounded-[10px]"
            key={item.id}
          >
            <View className="w-full relative flex-col items-center">
              <Image source={item.imgUrl} className="h-[70px] w-[70px]" />
              <Text className="text-[13px] text-black font-nunitosans-bold mt-3 leading-tight">
                {item.title}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
