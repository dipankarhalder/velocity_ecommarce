import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { user_profile } from "../../constant/static";
import { useAuthStore } from "../../store/auth";
import { Next, Heart, Shop, User, Logout, Delete } from "../../constant/icon";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="flex-col w-full px-5 mt-[70px]">
          <View className="flex-row w-full justify-center mb-[50px]">
            <Text className="text-[16px] text-gray-400 font-nunitosans-bold">
              Profile Details
            </Text>
          </View>
          <View className="flex-col w-full items-center">
            <Image
              source={user_profile}
              className="h-[120px] w-[120px] rounded-lg mb-3"
            />
            <Text className="text-[18px] text-[#ff0000] font-nunitosans-bold mb-[14px]">
              Ankit Roy Chowdhury
            </Text>
            <Text className="text-[13px] text-gray-900 font-nunitosans-semibold mb-[4px]">
              ankitroychowdhury@gmail.com
            </Text>
            <Text className="text-[13px] text-gray-900 font-nunitosans-semibold mb-[20px]">
              +91 9038716512
            </Text>
            <View className="flex-col w-full bg-white px-4 py-8 rounded-lg mb-4">
              <Text className="text-[12px] text-black font-nunitosans-bold mb-[16px]">
                Address
              </Text>
              <Text className="text-[14px] text-gray-500 font-nunitosans-semibold">
                151, 1st B Main Road, Koramangala 8th Block,
              </Text>
              <Text className="text-[14px] text-gray-500 font-nunitosans-semibold">
                Bangalore, Karnataka - 560095
              </Text>
            </View>

            <View className="flex-col w-full bg-white px-7 py-8 rounded-lg">
              <Text className="text-[12px] text-black font-nunitosans-bold mb-[20px]">
                Your Information
              </Text>
              <View className="flex-col w-full gap-5">
                <TouchableOpacity
                  className="flex-row justify-between items-center"
                  onPress={() => router.push("/")}
                >
                  <View className="flex-row items-center gap-3">
                    <Heart size={14} />
                    <Text className="text-[14px] text-gray-700 font-nunitosans-semibold">
                      Your Wishlist
                    </Text>
                  </View>
                  <Next color="#cccccc" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row justify-between items-center"
                  onPress={() => router.push("/")}
                >
                  <View className="flex-row items-center gap-3">
                    <Shop color="#000000" size={14} />
                    <Text className="text-[14px] text-gray-700 font-nunitosans-semibold">
                      Your Orders
                    </Text>
                  </View>
                  <Next color="#cccccc" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row justify-between items-center"
                  onPress={() => router.push("/")}
                >
                  <View className="flex-row items-center gap-3">
                    <User width={16} height={16} color="#000000" />
                    <Text className="text-[14px] text-gray-700 font-nunitosans-semibold">
                      About Us
                    </Text>
                  </View>
                  <Next color="#cccccc" size={18} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full flex-row justify-center mt-12 gap-4">
              <TouchableOpacity
                className="border border-[#ff0000] bg-[#ff0000] px-[16px] py-2 rounded-lg flex-row items-center gap-3"
                onPress={handleLogout}
              >
                <Logout color="#ffffff" size={15} />
                <Text className="text-[14px] text-white font-nunitosans-bold">
                  Log Out
                </Text>
              </TouchableOpacity>
              <View className="border border-[#ff0000] px-[16px] py-2 rounded-lg flex-row items-center gap-3">
                <Delete color="#ff0000" size={15} />
                <Text className="text-[14px] text-[#ff0000] font-nunitosans-bold">
                  Delete
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
