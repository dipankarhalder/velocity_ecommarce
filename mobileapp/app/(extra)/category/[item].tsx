import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { productList } from "../../../constant/static";
import AddToCartButton from "../../../components/AddToCartButton";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 48) / 2;

export default function CategoryDetailsPage() {
  const router = useRouter();
  const { item } = useLocalSearchParams() as any;
  const filteredData = productList.find((info) => info.category === item);
  const capitalizedFirstLetter =
    item && item.charAt(0).toUpperCase() + item.slice(1);

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView
        className="flex-1 bg-white mt-[70px]"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row w-full justify-center mb-[50px]">
          <Text className="text-[16px] text-gray-400 font-nunitosans-bold">
            {capitalizedFirstLetter}
          </Text>
        </View>
        {filteredData && (
          <View
            style={{ width: itemWidth }}
            className="rounded-[10px] border border-gray-300 px-3 pt-3 pb-5 mb-4"
            key={filteredData.id}
          >
            <TouchableOpacity
              className="flex-col items-center"
              onPress={() => router.push(`/details/${filteredData.id}`)}
            >
              <View className="overflow-hidden rounded-[10px]">
                <Image
                  source={filteredData.imgUrl}
                  className="w-[80px] h-[80px]"
                />
              </View>
              <View className="py-2">
                <Text
                  className="text-[13px] text-black text-center font-nunitosans-semibold mb-3"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {filteredData.title}
                </Text>
                <Text className="text-[15px] text-[#ff0000] text-center font-nunitosans-bold">
                  ₹ {filteredData.price} /-
                </Text>
                <Text className="text-[13px] text-gray-400 text-center font-nunitosans-bold line-through">
                  ₹ {filteredData.mainPrice} /-
                </Text>
              </View>
            </TouchableOpacity>
            <View className="w-full flex-row justify-center relative mt-1">
              <AddToCartButton product={filteredData} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
