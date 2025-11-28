import { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { useAuthStore } from "../../store/auth";
import { useCartStore } from "../../store/cart";
import { tabs_information } from "../../constant/static";
import { Shop, Monitor } from "../../constant/icon";
import { pathItem } from "../../constant/routes";

export default function AppLayout() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const totalItems = useCartStore((state) => state.getTotalCount());

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(pathItem.login as any);
    }
  }, [isAuthenticated, router]);

  const handleGetStarted = () => {
    console.log("hello");
  };

  return (
    <>
      <View className="absolute bottom-[90px] left-[50%] ml-[-88px] z-[1] flex-row gap-[10px]">
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-[#ff0000] w-[130px] py-[8px] rounded-full items-center flex-row justify-center gap-2"
          style={{
            shadowColor: "#ff0000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 4.65,
            elevation: 8,
          }}
        >
          <Monitor size={18} stroke={4} color="#ffffff" />
          <Text className="text-white text-[14px] font-nunitosans-bold">
            Build PC
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(pathItem.cart as any)}
          className="bg-[#ff0000] w-[36px] py-[8px] rounded-full p-3 flex-row justify-center gap-2"
          style={{
            shadowColor: "#ff0000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3.65,
            elevation: 5,
          }}
        >
          <Shop size={18} color="#ffffff" />
          {totalItems > 0 && (
            <View className="absolute -top-3 -right-3 bg-white border border-[#ff0000] rounded-full w-[24px] h-[24px] justify-center items-center">
              <Text className="text-[#ff0000] text-[13px] font-nunitosans-bold">
                {totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#C41131",
          tabBarInactiveTintColor: "#8e8e93",
          tabBarStyle: [
            {
              height: 80,
              paddingTop: 6,
              backgroundColor: "#ffffff",
            },
          ],
        }}
      >
        {tabs_information.map(({ name, title, Icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title: title,
              tabBarLabel: ({ color }) => (
                <Text
                  style={{ color }}
                  className="font-nunitosans-bold text-[13px] mt-1"
                >
                  {title}
                </Text>
              ),
              tabBarIcon: ({ color }) => (
                <Icon width={24} height={24} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
