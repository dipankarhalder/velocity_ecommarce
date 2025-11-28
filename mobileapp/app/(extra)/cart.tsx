import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useCartStore } from "../../store/cart";

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, clearCart } =
    useCartStore();

  const total = items.reduce(
    (sum, item) => sum + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="flex-col w-full px-5 mt-[70px]">
          <View className="flex-row w-full justify-center mb-[30px]">
            <Text className="text-[16px] text-gray-400 font-nunitosans-bold">
              Cart Items
            </Text>
          </View>
          <Text className="font-nunitosans-semibold text-[14px] mb-3 w-full text-right text-gray-600">
            Total Products:{" "}
            <Text className="text-[#ff0000] text-[14px] font-nunitosans-bold">
              {items.length} items
            </Text>
          </Text>
          <View className="flex-col w-full bg-white rounded-lg pb-5 px-4">
            {items.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between border-b border-gray-100 py-4 gap-3"
              >
                <Image
                  source={item.imgUrl}
                  className="w-[50px] h-[50px] rounded-md"
                />
                <View className="flex-1 ml-1">
                  <Text
                    className="text-[13px] font-nunitosans-semibold text-gray-800"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-[#ff0000] font-nunitosans-bold text-[14px]">
                    ₹ {item.price}
                  </Text>
                </View>
                <View className="flex-row items-center justify-center gap-2 ml-1">
                  <TouchableOpacity
                    className="w-[22px] h-[22px] bg-gray-200 rounded-md flex-row justify-center items-center"
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Text className="font-nunitosans-bold text-[16px]">-</Text>
                  </TouchableOpacity>
                  <Text className="font-nunitosans-bold w-[18px] h-[22px] text-center">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    className="w-[22px] h-[22px] bg-gray-200 rounded-md flex-row justify-center items-center"
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text className="font-nunitosans-bold text-[16px]">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View className="flex-col items-end mt-8 pb-3">
              <Text className="text-[14px] font-nunitosans-semibold text-right">
                Total Price:{"  "}
                <Text className="text-[#ff0000] text-[15px] font-nunitosans-bold">
                  ₹ {total.toLocaleString("en-IN")}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={clearCart}
                className="bg-[#ff0000] py-3 px-6 rounded-md mt-4"
              >
                <Text className="text-center text-white font-nunitosans-bold">
                  Process to Pay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-[120px]">
            <TouchableOpacity
              onPress={clearCart}
              className="mt-[50px] bg-gray-200 border border-gray-300 py-2 px-4 rounded-md"
            >
              <Text className="text-center text-black font-nunitosans-bold">
                Clear Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
