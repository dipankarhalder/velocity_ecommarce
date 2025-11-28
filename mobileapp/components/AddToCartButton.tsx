import React from "react";
import { View, Text, Pressable } from "react-native";
import { useCartStore } from "../store/cart";

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: string;
    mainPrice?: string;
    imgUrl: any;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { items, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const cartItem = items.find((i) => i.id === product.id);
  const count = cartItem ? cartItem.quantity : 0;

  return (
    <View className="w-auto">
      {count === 0 ? (
        <Pressable
          className="bg-red-100 px-4 rounded-md border border-[#ff0000]"
          onPress={() => addToCart(product)}
        >
          <Text className="text-[#ff0000] leading-[30px] h-[30px] text-center text-[12px] font-nunitosans-bold">
            Add to Cart
          </Text>
        </Pressable>
      ) : (
        <View className="flex-row items-center justify-between space-x-4 bg-[#ff0000] rounded-md">
          <Pressable onPress={() => decreaseQuantity(product.id)}>
            <Text className="text-xl h-[32px] w-[30px] text-white font-nunitosans-bold text-center leading-[30px]">
              -
            </Text>
          </Pressable>
          <Text className="text-base font-nunitosans-bold text-white px-2">
            {count}
          </Text>
          <Pressable onPress={() => increaseQuantity(product.id)}>
            <Text className="text-xl h-[32px] w-[30px] text-white font-nunitosans-bold text-center leading-[30px]">
              +
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
