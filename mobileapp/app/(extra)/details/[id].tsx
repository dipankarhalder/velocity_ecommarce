import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { productList } from "../../../constant/static";
import { Star } from "../../../constant/icon";
import AddToDetails from "../../../components/AddToDetails";

export default function DetailsPage() {
  const { id } = useLocalSearchParams();

  const numericId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id || "", 10);
  const filteredData = productList.find((item) => item.id === numericId);

  const handleCountChange = (count: number) => {
    console.log("Cart count:", count);
  };

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full relative">
          {filteredData && (
            <View className="w-full bg-white flex items-center relative pt-[80px]">
              <Image
                source={filteredData.imgUrl}
                className="w-[320px] h-[320px]"
              />
            </View>
          )}
          <View className="absolute top-0 left-0 right-0 h-full w-full bg-black opacity-[0.1] rounded-[30px]"></View>
        </View>
        {filteredData ? (
          <View className="w-full pt-[26px] px-[26px] relative">
            <View className="w-full flex-row mb-5 justify-between items-center">
              <View className="bg-[#FF0000] w-auto px-[12px] py-[4px] rounded-md">
                <Text className="text-white text-[13px] font-nunitosans-bold">
                  {filteredData.category}
                </Text>
              </View>
              <View className="flex-row gap-2 items-center">
                <Star size={15} />
                <Text className="text-black text-[15px] font-nunitosans-semibold">
                  {filteredData.rating}
                </Text>
              </View>
            </View>
            <Text className="text-[18px] text-black text-left font-nunitosans-bold mb-3">
              {filteredData.title}
            </Text>
            <Text className="w-full text-gray-500 font-nunitosans-semibold mb-7">
              Delivery is guaranteed as long as our locations stay open
              according to government regulations.
            </Text>
            <View className="w-full h-[1px] bg-gray-100 mb-7"></View>
            <View className="w-full mb-7">
              <Text className="w-full text-gray-400 text-[13px] font-nunitosans-bold mb-3">
                Price
              </Text>
              <View className="flex-row justify-between items-center mb-[8px]">
                <Text className="text-gray-700 text-[15px] font-nunitosans-bold">
                  Offer Price:
                </Text>
                <Text className="text-[#ff0000] text-[15px] font-nunitosans-bold">
                  ₹ {filteredData.price} /-{" "}
                  <Text className="text-gray-500 text-[13px]">(31% off)</Text>
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700 text-[15px] font-nunitosans-bold">
                  Price:
                </Text>
                <Text className="text-black text-[15px] text-gray-700 font-nunitosans-bold line-through">
                  ₹ {filteredData.mainPrice} /-
                </Text>
              </View>
            </View>
            <View className="w-full h-[1px] bg-gray-100 mb-7"></View>
            <View className="w-full mb-7">
              <Text className="w-full text-gray-400 text-[13px] font-nunitosans-bold mb-3">
                Short Overview
              </Text>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-700 text-[13px] font-nunitosans-bold">
                  Category:
                </Text>
                <Text className="text-[#ff0000] text-[13px] font-nunitosans-bold">
                  {filteredData.category}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-700 text-[13px] font-nunitosans-bold">
                  Brand:
                </Text>
                <Text className="text-[#ff0000] text-[13px] font-nunitosans-bold">
                  AMD
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-700 text-[13px] font-nunitosans-bold">
                  Product Code:
                </Text>
                <Text className="text-[#ff0000] text-[13px] font-nunitosans-bold">
                  100-100000144BOX
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700 text-[13px] font-nunitosans-bold">
                  Availability:
                </Text>
                <Text className="text-green-600 text-[13px] font-nunitosans-bold bg-green-100 rounded-md px-[6px] py-[2px]">
                  In Stock
                </Text>
              </View>
            </View>
            <View className="w-full h-[1px] bg-gray-100 mb-7"></View>
            <View className="w-full mb-7">
              <Text className="w-full text-gray-400 text-[13px] font-nunitosans-bold mb-3">
                Description
              </Text>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-700 text-[13px] font-nunitosans-bold">
                  The AMD Ryzen 3 4300G is a desktop processor with 4 cores,
                  launched in July 2020. It is part of the Ryzen 3 lineup, using
                  the Zen 2 (Renoir) architecture with Socket AM4.
                </Text>
              </View>
            </View>
            <View className="w-full h-[1px] bg-gray-100 mb-7"></View>
            <View className="w-full mb-7">
              <Text className="w-full text-gray-400 text-[13px] font-nunitosans-bold mb-3">
                Specification
              </Text>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  CPU:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  Ryzen 3
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Cores:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  4
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Series:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  4000 Series
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Memory:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  DDR4
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Socket:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  AM4
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Speed:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  3.8 GHz
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Cache:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  6 MB
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-gray-600 text-[13px] font-nunitosans-bold">
                  Warranty:
                </Text>
                <Text className="text-black text-[13px] font-nunitosans-bold">
                  3 years
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Text className="text-gray-500 mb-8">Item not found</Text>
        )}
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-6 py-5 flex-row justify-center gap-4 bg-white">
        <AddToDetails onChange={handleCountChange} />
        <TouchableOpacity
          className="bg-[#FF0000] rounded-full h-[42px] px-7 flex-row justify-center items-center"
          onPress={() => console.log("Buy Now Pressed")}
        >
          <Text className="text-white text-[14px] font-nunitosans-bold">
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
