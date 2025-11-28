import React, { useState } from "react";
import { View, Text, TextInput, Platform, Image } from "react-native";
import { SearchIc, SearchItems } from "../../constant/icon";
import { searchList } from "../../constant/static";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-col w-full px-5 mt-[70px]">
        <View className="flex-row w-full justify-center mb-[20px]">
          <Text className="text-[16px] text-gray-400 font-nunitosans-bold">
            Search
          </Text>
        </View>
        <View className="flex">
          <View
            className={`flex-row items-center border border-white bg-white rounded-[10px] gap-4 px-4 mb-0 ${
              Platform.OS === "ios" ? "h-[44px]" : "h-[48px]"
            }`}
          >
            <SearchIc />
            <TextInput
              value={searchInput}
              placeholder="Search here..."
              onChangeText={(text) => setSearchInput(text)}
              className="text-black flex-1 font-nunitosans-semibold text-[16px]"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View className="w-full h-[1px] bg-gray-200 mt-[30px]"></View>
        <View className="w-full flex-col mt-4">
          <Text className="text-[13px] text-gray-500 font-nunitosans-bold">
            Recent Searches
          </Text>
          <View className="w-full flex-col mt-6 gap-3 mb-4">
            <View className="flex-row w-full gap-4">
              <SearchItems size={20} color="#bbbbbb" />
              <Text className="text-[14px] text-black font-nunitosans-semibold">
                iPhone 17 pro
              </Text>
            </View>
            <View className="flex-row w-full gap-4">
              <SearchItems size={20} color="#bbbbbb" />
              <Text className="text-[14px] text-black font-nunitosans-semibold">
                iPhone Air
              </Text>
            </View>
            <View className="flex-row w-full gap-4">
              <SearchItems size={20} color="#bbbbbb" />
              <Text className="text-[14px] text-black font-nunitosans-semibold">
                Asus 4k IPS Monitor
              </Text>
            </View>
            <View className="flex-row w-full gap-4">
              <SearchItems size={20} color="#bbbbbb" />
              <Text className="text-[14px] text-black font-nunitosans-semibold">
                Intel i7 Processor
              </Text>
            </View>
          </View>
          <View className="w-full flex-col mt-6 gap-3">
            {searchList.map((item) => (
              <View
                className="w-full flex-row bg-white rounded-lg overflow-hidden gap-3 px-2 py-1.5 items-center"
                key={item.id}
              >
                <View className="w-[60px] relative">
                  <Image source={item.imgUrl} className="w-[60px] h-[60px]" />
                </View>
                <View className="flex-col pr-2">
                  <Text
                    className="text-[14px] text-black font-nunitosans-semibold"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-[13px] text-black font-nunitosans-semibold">
                    {item.category}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
